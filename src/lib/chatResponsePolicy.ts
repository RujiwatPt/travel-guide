import type { ChatGuardResult } from './chatGuard'

export type SearchConfidence = 'high' | 'medium' | 'low'

export type ChatResponseDecision = {
  confidence: SearchConfidence
  shouldShowCards: boolean
  text: string
}

type ResponsePolicyInput = {
  guard: ChatGuardResult
  searchResultCount: number
  topScore: number
}

function thaiOffTopic(): ChatResponseDecision {
  return {
    confidence: 'low',
    shouldShowCards: false,
    text: 'ผมช่วยเรื่องเที่ยวนครพนมเป็นหลักครับ ถ้าอยากให้แนะนำ ลองพิมพ์ เช่น “ขอที่เที่ยวสายบุญ”, “หาร้านอาหารเช้า”, หรือ “วางแผนเที่ยวครึ่งวัน”',
  }
}

function englishOffTopic(): ChatResponseDecision {
  return {
    confidence: 'low',
    shouldShowCards: false,
    text: 'I mainly help with Nakhon Phanom travel. Try asking for temples, food, nature spots, photo spots, or a half-day plan.',
  }
}

function thaiPause(): ChatResponseDecision {
  return {
    confidence: 'low',
    shouldShowCards: false,
    text: 'ได้ครับ พิมพ์ต่อได้เลย ถ้าอยากให้ช่วยเรื่องที่เที่ยว ร้านอาหาร หรือวางแผนทริปนครพนม',
  }
}

function englishPause(): ChatResponseDecision {
  return {
    confidence: 'low',
    shouldShowCards: false,
    text: 'No problem. Continue when you are ready.',
  }
}

function thaiUnclear(): ChatResponseDecision {
  return {
    confidence: 'low',
    shouldShowCards: false,
    text: 'ผมยังไม่แน่ใจว่าคุณอยากหาอะไรในนครพนมครับ อยากได้วัด ร้านอาหาร คาเฟ่ ธรรมชาติ หรือให้ผมวางแผนทริปให้?',
  }
}

function englishUnclear(): ChatResponseDecision {
  return {
    confidence: 'low',
    shouldShowCards: false,
    text: 'I am not sure what kind of place you want. Do you mean temples, food, cafes, nature, or a trip plan?',
  }
}

function computeConfidence(topScore: number, hasTravelHint: boolean): SearchConfidence {
  if (topScore >= 75) return 'high'
  if (topScore >= 55 || hasTravelHint) return 'medium'
  return 'low'
}

export function decideChatResponse({
  guard,
  searchResultCount,
  topScore,
}: ResponsePolicyInput): ChatResponseDecision {
  const thai = guard.language === 'th'

  if (guard.intent === 'off_topic') {
    return thai ? thaiOffTopic() : englishOffTopic()
  }

  if (guard.intent === 'pause') {
    return thai ? thaiPause() : englishPause()
  }

  if (guard.intent === 'unclear') {
    return thai ? thaiUnclear() : englishUnclear()
  }

  if (guard.intent === 'travel_plan') {
    return {
      confidence: 'high',
      shouldShowCards: false,
      text: thai
        ? 'ได้ครับ ผมจะช่วยจัดทริปนครพนมให้ตามคำขอของคุณ'
        : 'I can help plan a Nakhon Phanom trip for that request.',
    }
  }

  const confidence = computeConfidence(topScore, Boolean(guard.travelHint))
  if (confidence === 'low' || searchResultCount === 0) {
    return thai ? thaiUnclear() : englishUnclear()
  }

  if (thai) {
    if (guard.travelHint === 'blessing') {
      return {
        confidence,
        shouldShowCards: true,
        text:
          confidence === 'high'
            ? 'ผมเจอตัวเลือกที่ตรงกับคำขอของคุณ ลองเริ่มจากที่นี่ครับ'
            : 'ถ้าคุณหมายถึงสถานที่ขอพรเรื่องบุตรหรือสายบุญในนครพนม ผมจะแนะนำตัวเลือกที่เกี่ยวกับวัดและการขอพรให้ครับ',
      }
    }

    return {
      confidence,
      shouldShowCards: true,
      text:
        confidence === 'high'
          ? 'ผมเจอตัวเลือกที่ตรงกับคำขอของคุณ ลองเริ่มจากที่นี่ครับ'
          : 'ผมเดาว่าคุณอาจกำลังมองหาสถานที่แนวนี้ ลองดูตัวเลือกเหล่านี้ก่อนครับ',
    }
  }

  return {
    confidence,
    shouldShowCards: true,
    text:
      confidence === 'high'
        ? 'I found options that fit what you asked for. Start here.'
        : guard.travelHint === 'blessing'
        ? 'If you mean blessing or fertility-related places in Nakhon Phanom, these temple options are the closest fit.'
        : 'I think these may be the kind of places you mean. Try these options first.',
  }
}
