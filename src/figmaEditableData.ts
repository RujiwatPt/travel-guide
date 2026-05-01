import type { CSSProperties } from 'react'

export type EditableFigmaLayer = {
  kind: 'shape' | 'text'
  name: string
  text?: string
  style: CSSProperties
}

export type EditableFigmaScreen = {
  id: string
  name: string
  width: number
  height: number
  layers: EditableFigmaLayer[]
}

export const editableFigmaScreens = [
  {
    "name": "Plan A Trip",
    "id": "4001:1575",
    "width": 375,
    "height": 812,
    "layers": [
      {
        "kind": "shape",
        "name": "Vector 1",
        "style": {
          "left": "-66.0px",
          "top": "-100.0px",
          "width": "563.0px",
          "height": "269.5px",
          "background": "linear-gradient(135deg, rgba(125, 175, 220, 1.0) 18%, rgba(252, 236, 206, 1.0) 41%, rgba(251, 227, 141, 1.0) 78%, rgba(253, 236, 183, 1.0) 100%)"
        }
      },
      {
        "kind": "shape",
        "name": "Vector 2",
        "style": {
          "left": "-55.0px",
          "top": "-103.0px",
          "width": "699.0px",
          "height": "318.0px",
          "background": "linear-gradient(135deg, rgba(155, 203, 247, 0.8) 18%, rgba(253, 236, 183, 0.8) 100%)"
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "236.32px",
          "top": "-104.06px",
          "width": "401.52px",
          "height": "399.13px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.09
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "206.42px",
          "top": "-239.0px",
          "width": "64.35px",
          "height": "533.74px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.09
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "-162.11px",
          "top": "-106.82px",
          "width": "398.63px",
          "height": "401.52px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.09
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "236.37px",
          "top": "-209.82px",
          "width": "236.02px",
          "height": "504.55px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.09
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "-268.0px",
          "top": "58.62px",
          "width": "504.56px",
          "height": "236.03px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.09
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "4.64px",
          "top": "-211.33px",
          "width": "231.84px",
          "height": "506.06px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.06
        }
      },
      {
        "kind": "text",
        "name": "Plan A Trip",
        "text": "Plan A Trip",
        "style": {
          "left": "139.0px",
          "top": "74.0px",
          "width": "97.0px",
          "height": "15.0px",
          "color": "rgba(0, 16, 20, 1.0)",
          "fontSize": "20.0px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "24.6px",
          "textAlign": "center"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 21",
        "style": {
          "left": "24.0px",
          "top": "57.0px",
          "width": "48.0px",
          "height": "48.0px",
          "background": "rgba(240, 243, 245, 0.5)",
          "borderRadius": "24.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 22",
        "style": {
          "left": "303.0px",
          "top": "57.0px",
          "width": "48.0px",
          "height": "48.0px",
          "background": "rgba(240, 243, 245, 0.6)",
          "borderRadius": "24.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 1000002911",
        "style": {
          "left": "24.0px",
          "top": "124.15px",
          "width": "327.0px",
          "height": "77.09px",
          "border": "1.0px solid rgba(255, 255, 255, 0.77)",
          "borderRadius": "18.0px"
        }
      },
      {
        "kind": "shape",
        "name": "image 97",
        "style": {
          "left": "24.0px",
          "top": "124.15px",
          "width": "327.0px",
          "height": "77.0px",
          "backgroundImage": "url(/figma-assets-small/35-dadc64bcc0.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat"
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "46.33px",
          "top": "151.61px",
          "width": "23.33px",
          "height": "19.26px",
          "border": "2.0px solid rgba(13, 15, 51, 1.0)"
        }
      },
      {
        "kind": "text",
        "name": "Mount Fuji, Japan",
        "text": "Mount Fuji, Japan",
        "style": {
          "left": "80.0px",
          "top": "157.15px",
          "width": "130.0px",
          "height": "12.0px",
          "color": "rgba(12, 18, 93, 1.0)",
          "fontSize": "16.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "19.68px",
          "textAlign": "center"
        }
      },
      {
        "kind": "shape",
        "name": "Border",
        "style": {
          "left": "314.33px",
          "top": "22.0px",
          "width": "22.0px",
          "height": "11.33px",
          "border": "1.0px solid rgba(0, 0, 0, 1.0)",
          "borderRadius": "2.67px",
          "opacity": 0.35
        }
      },
      {
        "kind": "shape",
        "name": "Capacity",
        "style": {
          "left": "316.33px",
          "top": "24.0px",
          "width": "18.0px",
          "height": "7.33px",
          "background": "rgba(0, 0, 0, 1.0)",
          "borderRadius": "1.33px"
        }
      },
      {
        "kind": "shape",
        "name": "Wifi",
        "style": {
          "left": "294.03px",
          "top": "22.0px",
          "width": "15.27px",
          "height": "10.97px",
          "background": "rgba(0, 0, 0, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "Cellular Connection",
        "style": {
          "left": "272.0px",
          "top": "22.34px",
          "width": "17.0px",
          "height": "10.67px",
          "background": "rgba(0, 0, 0, 1.0)"
        }
      },
      {
        "kind": "text",
        "name": "↳ Time",
        "text": "9:54",
        "style": {
          "left": "25.0px",
          "top": "22.0px",
          "width": "30.0px",
          "height": "10.0px",
          "color": "rgba(0, 0, 0, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 500,
          "fontFamily": "Satoshi Variable, Plus Jakarta Sans, sans-serif",
          "lineHeight": "18.0px",
          "textAlign": "center"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 1000002961",
        "style": {
          "left": "24.0px",
          "top": "225.0px",
          "width": "327.0px",
          "height": "304.0px",
          "border": "1.0px solid rgba(216, 227, 235, 1.0)",
          "borderRadius": "30.0px"
        }
      },
      {
        "kind": "text",
        "name": "Date & Budget",
        "text": "Date & Budget ",
        "style": {
          "left": "43.5px",
          "top": "253.0px",
          "width": "129.0px",
          "height": "13.0px",
          "color": "rgba(0, 0, 0, 1.0)",
          "fontSize": "18.0px",
          "fontWeight": 700,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "22.5px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "Save",
        "text": "Save",
        "style": {
          "left": "298.5px",
          "top": "253.0px",
          "width": "33.0px",
          "height": "10.0px",
          "color": "rgba(28, 144, 249, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "17.5px",
          "textAlign": "right"
        }
      },
      {
        "kind": "text",
        "name": "T",
        "text": "T",
        "style": {
          "left": "43.5px",
          "top": "294.0px",
          "width": "36.0px",
          "height": "9.0px",
          "color": "rgba(0, 0, 0, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "16.2px",
          "textAlign": "center"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 1000002928",
        "style": {
          "left": "43.5px",
          "top": "315.0px",
          "width": "36.0px",
          "height": "36.0px",
          "background": "rgba(16, 132, 241, 1.0)",
          "borderRadius": "13.0px"
        }
      },
      {
        "kind": "text",
        "name": "14",
        "text": "14",
        "style": {
          "left": "53.5px",
          "top": "328.0px",
          "width": "15.0px",
          "height": "10.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 700,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "18.9px",
          "textAlign": "center"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 506",
        "style": {
          "left": "58.0px",
          "top": "344.0px",
          "width": "6.0px",
          "height": "2.0px",
          "background": "rgba(255, 255, 255, 1.0)",
          "borderRadius": "1.0px"
        }
      },
      {
        "kind": "text",
        "name": "W",
        "text": "W",
        "style": {
          "left": "85.5px",
          "top": "294.0px",
          "width": "36.0px",
          "height": "9.0px",
          "color": "rgba(0, 0, 0, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "16.2px",
          "textAlign": "center"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 1000002930",
        "style": {
          "left": "85.5px",
          "top": "315.0px",
          "width": "36.0px",
          "height": "36.0px",
          "background": "rgba(230, 243, 255, 1.0)",
          "borderRadius": "13.0px"
        }
      },
      {
        "kind": "text",
        "name": "15",
        "text": "15",
        "style": {
          "left": "96.5px",
          "top": "328.0px",
          "width": "14.0px",
          "height": "10.0px",
          "color": "rgba(0, 0, 0, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "18.9px",
          "textAlign": "center"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 507",
        "style": {
          "left": "100.5px",
          "top": "344.0px",
          "width": "6.0px",
          "height": "2.0px",
          "background": "rgba(28, 144, 249, 1.0)",
          "borderRadius": "1.0px"
        }
      },
      {
        "kind": "text",
        "name": "T",
        "text": "T",
        "style": {
          "left": "127.5px",
          "top": "294.0px",
          "width": "36.0px",
          "height": "9.0px",
          "color": "rgba(0, 0, 0, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "16.2px",
          "textAlign": "center"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 1000002932",
        "style": {
          "left": "127.5px",
          "top": "315.0px",
          "width": "36.0px",
          "height": "36.0px",
          "background": "rgba(230, 243, 255, 1.0)",
          "borderRadius": "13.0px"
        }
      },
      {
        "kind": "text",
        "name": "16",
        "text": "16",
        "style": {
          "left": "138.5px",
          "top": "328.0px",
          "width": "14.0px",
          "height": "10.0px",
          "color": "rgba(0, 0, 0, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "18.9px",
          "textAlign": "center"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 508",
        "style": {
          "left": "142.5px",
          "top": "344.0px",
          "width": "6.0px",
          "height": "2.0px",
          "background": "rgba(28, 144, 249, 1.0)",
          "borderRadius": "1.0px"
        }
      },
      {
        "kind": "text",
        "name": "F",
        "text": "F",
        "style": {
          "left": "169.5px",
          "top": "294.0px",
          "width": "36.0px",
          "height": "9.0px",
          "color": "rgba(0, 0, 0, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "16.2px",
          "textAlign": "center"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 1000002934",
        "style": {
          "left": "169.5px",
          "top": "315.0px",
          "width": "36.0px",
          "height": "36.0px",
          "background": "rgba(230, 243, 255, 1.0)",
          "borderRadius": "13.0px"
        }
      },
      {
        "kind": "text",
        "name": "17",
        "text": "17",
        "style": {
          "left": "180.5px",
          "top": "328.0px",
          "width": "14.0px",
          "height": "10.0px",
          "color": "rgba(0, 0, 0, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "18.9px",
          "textAlign": "center"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 509",
        "style": {
          "left": "184.5px",
          "top": "344.0px",
          "width": "6.0px",
          "height": "2.0px",
          "background": "rgba(28, 144, 249, 1.0)",
          "borderRadius": "1.0px"
        }
      },
      {
        "kind": "text",
        "name": "S",
        "text": "S",
        "style": {
          "left": "211.5px",
          "top": "294.0px",
          "width": "36.0px",
          "height": "9.0px",
          "color": "rgba(0, 0, 0, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "16.2px",
          "textAlign": "center"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 1000002918",
        "style": {
          "left": "211.5px",
          "top": "315.0px",
          "width": "36.0px",
          "height": "36.0px",
          "background": "rgba(237, 240, 242, 1.0)",
          "borderRadius": "13.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 513",
        "style": {
          "left": "204.5px",
          "top": "307.0px",
          "width": "29.25px",
          "height": "27.1px",
          "background": "rgba(224, 229, 232, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 514",
        "style": {
          "left": "205.16px",
          "top": "309.79px",
          "width": "33.36px",
          "height": "30.87px",
          "background": "rgba(224, 229, 232, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 515",
        "style": {
          "left": "207.75px",
          "top": "309.79px",
          "width": "38.77px",
          "height": "35.84px",
          "background": "rgba(224, 229, 232, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 516",
        "style": {
          "left": "210.34px",
          "top": "314.76px",
          "width": "38.77px",
          "height": "35.84px",
          "background": "rgba(224, 229, 232, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 517",
        "style": {
          "left": "212.93px",
          "top": "319.73px",
          "width": "38.77px",
          "height": "35.84px",
          "background": "rgba(224, 229, 232, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 518",
        "style": {
          "left": "215.52px",
          "top": "324.7px",
          "width": "38.77px",
          "height": "35.84px",
          "background": "rgba(224, 229, 232, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 519",
        "style": {
          "left": "218.11px",
          "top": "329.67px",
          "width": "38.77px",
          "height": "35.84px",
          "background": "rgba(224, 229, 232, 1.0)"
        }
      },
      {
        "kind": "text",
        "name": "18",
        "text": "18",
        "style": {
          "left": "222.0px",
          "top": "328.0px",
          "width": "15.0px",
          "height": "10.0px",
          "color": "rgba(0, 0, 0, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "18.9px",
          "textAlign": "center"
        }
      },
      {
        "kind": "text",
        "name": "S",
        "text": "S",
        "style": {
          "left": "253.5px",
          "top": "294.0px",
          "width": "36.0px",
          "height": "9.0px",
          "color": "rgba(0, 0, 0, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "16.2px",
          "textAlign": "center"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 1000002917",
        "style": {
          "left": "253.5px",
          "top": "315.0px",
          "width": "36.0px",
          "height": "36.0px",
          "background": "rgba(237, 240, 242, 1.0)",
          "borderRadius": "13.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 513",
        "style": {
          "left": "246.5px",
          "top": "307.0px",
          "width": "29.25px",
          "height": "27.1px",
          "background": "rgba(224, 229, 232, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 514",
        "style": {
          "left": "247.16px",
          "top": "309.79px",
          "width": "33.36px",
          "height": "30.87px",
          "background": "rgba(224, 229, 232, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 515",
        "style": {
          "left": "249.75px",
          "top": "309.79px",
          "width": "38.77px",
          "height": "35.84px",
          "background": "rgba(224, 229, 232, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 516",
        "style": {
          "left": "252.34px",
          "top": "314.76px",
          "width": "38.77px",
          "height": "35.84px",
          "background": "rgba(224, 229, 232, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 517",
        "style": {
          "left": "254.93px",
          "top": "319.73px",
          "width": "38.77px",
          "height": "35.84px",
          "background": "rgba(224, 229, 232, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 518",
        "style": {
          "left": "257.52px",
          "top": "324.7px",
          "width": "38.77px",
          "height": "35.84px",
          "background": "rgba(224, 229, 232, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 519",
        "style": {
          "left": "260.11px",
          "top": "329.67px",
          "width": "38.77px",
          "height": "35.84px",
          "background": "rgba(224, 229, 232, 1.0)"
        }
      },
      {
        "kind": "text",
        "name": "19",
        "text": "19",
        "style": {
          "left": "264.5px",
          "top": "328.0px",
          "width": "14.0px",
          "height": "10.0px",
          "color": "rgba(0, 0, 0, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "18.9px",
          "textAlign": "center"
        }
      },
      {
        "kind": "text",
        "name": "M",
        "text": "M",
        "style": {
          "left": "295.5px",
          "top": "294.0px",
          "width": "36.0px",
          "height": "9.0px",
          "color": "rgba(0, 0, 0, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "16.2px",
          "textAlign": "center"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 1000002916",
        "style": {
          "left": "295.5px",
          "top": "315.0px",
          "width": "36.0px",
          "height": "36.0px",
          "background": "rgba(237, 240, 242, 1.0)",
          "borderRadius": "13.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 513",
        "style": {
          "left": "288.5px",
          "top": "307.0px",
          "width": "29.25px",
          "height": "27.1px",
          "background": "rgba(224, 229, 232, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 514",
        "style": {
          "left": "289.16px",
          "top": "309.79px",
          "width": "33.36px",
          "height": "30.87px",
          "background": "rgba(224, 229, 232, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 515",
        "style": {
          "left": "291.75px",
          "top": "309.79px",
          "width": "38.77px",
          "height": "35.84px",
          "background": "rgba(224, 229, 232, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 516",
        "style": {
          "left": "294.34px",
          "top": "314.76px",
          "width": "38.77px",
          "height": "35.84px",
          "background": "rgba(224, 229, 232, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 517",
        "style": {
          "left": "296.93px",
          "top": "319.73px",
          "width": "38.77px",
          "height": "35.84px",
          "background": "rgba(224, 229, 232, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 518",
        "style": {
          "left": "299.52px",
          "top": "324.7px",
          "width": "38.77px",
          "height": "35.84px",
          "background": "rgba(224, 229, 232, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 519",
        "style": {
          "left": "302.11px",
          "top": "329.67px",
          "width": "38.77px",
          "height": "35.84px",
          "background": "rgba(224, 229, 232, 1.0)"
        }
      },
      {
        "kind": "text",
        "name": "20",
        "text": "20",
        "style": {
          "left": "304.0px",
          "top": "328.0px",
          "width": "19.0px",
          "height": "10.0px",
          "color": "rgba(0, 0, 0, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "18.9px",
          "textAlign": "center"
        }
      },
      {
        "kind": "text",
        "name": "Amount",
        "text": "Amount",
        "style": {
          "left": "43.5px",
          "top": "371.0px",
          "width": "288.0px",
          "height": "10.0px",
          "color": "rgba(0, 0, 0, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 400,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "18.9px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 1000002950",
        "style": {
          "left": "43.5px",
          "top": "391.0px",
          "width": "288.0px",
          "height": "46.0px",
          "background": "rgba(249, 250, 251, 1.0)",
          "border": "1.0px solid rgba(216, 227, 235, 1.0)",
          "borderRadius": "12.0px"
        }
      },
      {
        "kind": "text",
        "name": "$1,100.00",
        "text": "$1,100.00",
        "style": {
          "left": "61.5px",
          "top": "409.0px",
          "width": "69.0px",
          "height": "10.0px",
          "color": "rgba(0, 0, 0, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "18.9px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "$200.00",
        "text": "$200.00",
        "style": {
          "left": "43.5px",
          "top": "467.0px",
          "width": "63.0px",
          "height": "10.0px",
          "color": "rgba(0, 0, 0, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "18.9px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "$2,000.00",
        "text": "$2,000.00",
        "style": {
          "left": "251.5px",
          "top": "467.0px",
          "width": "77.0px",
          "height": "10.0px",
          "color": "rgba(0, 0, 0, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "18.9px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 521",
        "style": {
          "left": "43.5px",
          "top": "488.0px",
          "width": "285.0px",
          "height": "6.0px",
          "background": "rgba(217, 217, 217, 1.0)",
          "borderRadius": "3.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 522",
        "style": {
          "left": "43.5px",
          "top": "488.0px",
          "width": "162.0px",
          "height": "6.0px",
          "background": "rgba(28, 144, 249, 1.0)",
          "borderRadius": "3.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 1000002952",
        "style": {
          "left": "183.5px",
          "top": "485.0px",
          "width": "22.0px",
          "height": "12.0px",
          "background": "rgba(28, 144, 249, 1.0)",
          "borderRadius": "5.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 524",
        "style": {
          "left": "190.5px",
          "top": "489.0px",
          "width": "8.0px",
          "height": "4.0px",
          "background": "rgba(255, 255, 255, 0.6)",
          "borderRadius": "1.6px"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 525",
        "style": {
          "left": "164.5px",
          "top": "454.0px",
          "width": "60.0px",
          "height": "31.0px",
          "background": "rgba(164, 211, 253, 1.0)",
          "borderRadius": "12.5px 12.5px 12.5px 12.5px"
        }
      },
      {
        "kind": "text",
        "name": "$1,100.00",
        "text": "$1,100.00",
        "style": {
          "left": "174.5px",
          "top": "464.0px",
          "width": "40.0px",
          "height": "6.0px",
          "color": "rgba(0, 0, 0, 1.0)",
          "fontSize": "8.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "10.8px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 1000002962",
        "style": {
          "left": "24.0px",
          "top": "545.0px",
          "width": "327.0px",
          "height": "185.0px",
          "border": "1.0px solid rgba(253, 236, 201, 1.0)",
          "borderRadius": "30.0px"
        }
      },
      {
        "kind": "text",
        "name": "Travel Style",
        "text": "Travel Style",
        "style": {
          "left": "43.0px",
          "top": "573.0px",
          "width": "100.0px",
          "height": "13.0px",
          "color": "rgba(0, 0, 0, 1.0)",
          "fontSize": "18.0px",
          "fontWeight": 700,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "22.5px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "Save",
        "text": "Save",
        "style": {
          "left": "298.0px",
          "top": "573.0px",
          "width": "33.0px",
          "height": "10.0px",
          "color": "rgba(248, 186, 12, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "17.5px",
          "textAlign": "right"
        }
      },
      {
        "kind": "text",
        "name": "Solo Travel",
        "text": "Solo Travel",
        "style": {
          "left": "123.0px",
          "top": "687.0px",
          "width": "52.0px",
          "height": "7.0px",
          "color": "rgba(0, 0, 0, 1.0)",
          "fontSize": "10.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "12.2px",
          "textAlign": "center"
        }
      },
      {
        "kind": "text",
        "name": "Road Trip",
        "text": "Road Trip",
        "style": {
          "left": "202.0px",
          "top": "687.0px",
          "width": "45.0px",
          "height": "7.0px",
          "color": "rgba(0, 0, 0, 1.0)",
          "fontSize": "10.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "12.2px",
          "textAlign": "center"
        }
      },
      {
        "kind": "text",
        "name": "Family Tour",
        "text": "Family Tour",
        "style": {
          "left": "273.0px",
          "top": "687.0px",
          "width": "53.0px",
          "height": "7.0px",
          "color": "rgba(0, 0, 0, 1.0)",
          "fontSize": "10.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "12.2px",
          "textAlign": "center"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 1000002928",
        "style": {
          "left": "117.0px",
          "top": "610.0px",
          "width": "65.0px",
          "height": "65.0px",
          "background": "rgba(249, 249, 249, 1.0)",
          "borderRadius": "15.0px"
        }
      },
      {
        "kind": "shape",
        "name": "image 101",
        "style": {
          "left": "124.0px",
          "top": "617.0px",
          "width": "51.0px",
          "height": "51.0px",
          "backgroundImage": "url(/figma-assets-small/28-c4fd1edb88.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 1000002960",
        "style": {
          "left": "192.0px",
          "top": "610.0px",
          "width": "65.0px",
          "height": "65.0px",
          "background": "rgba(249, 249, 249, 1.0)",
          "borderRadius": "15.0px"
        }
      },
      {
        "kind": "shape",
        "name": "image 103",
        "style": {
          "left": "199.0px",
          "top": "617.0px",
          "width": "51.0px",
          "height": "51.0px",
          "backgroundImage": "url(/figma-assets-small/26-bec0979930.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 1000002961",
        "style": {
          "left": "267.0px",
          "top": "610.0px",
          "width": "65.0px",
          "height": "65.0px",
          "background": "rgba(249, 249, 249, 1.0)",
          "borderRadius": "15.0px"
        }
      },
      {
        "kind": "shape",
        "name": "image 104",
        "style": {
          "left": "274.0px",
          "top": "617.0px",
          "width": "51.0px",
          "height": "51.0px",
          "backgroundImage": "url(/figma-assets-small/09-612b3bba94.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 1000002959",
        "style": {
          "left": "43.0px",
          "top": "610.0px",
          "width": "65.0px",
          "height": "65.0px",
          "background": "rgba(249, 249, 249, 1.0)",
          "border": "1.0px solid rgba(248, 186, 12, 1.0)",
          "borderRadius": "15.0px"
        }
      },
      {
        "kind": "shape",
        "name": "image 102",
        "style": {
          "left": "50.0px",
          "top": "617.0px",
          "width": "51.0px",
          "height": "51.0px",
          "backgroundImage": "url(/figma-assets-small/01-02cd721eaa.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat"
        }
      },
      {
        "kind": "text",
        "name": "Adventure",
        "text": "Adventure",
        "style": {
          "left": "50.0px",
          "top": "687.0px",
          "width": "50.0px",
          "height": "7.0px",
          "color": "rgba(0, 0, 0, 1.0)",
          "fontSize": "10.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "13.5px",
          "textAlign": "center"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 1000002964",
        "style": {
          "left": "24.0px",
          "top": "762.0px",
          "width": "327.0px",
          "height": "58.0px",
          "background": "rgba(113, 182, 245, 1.0)",
          "borderRadius": "13.0px"
        }
      },
      {
        "kind": "text",
        "name": "Generate Itinerary",
        "text": "Generate Itinerary",
        "style": {
          "left": "116.5px",
          "top": "785.0px",
          "width": "142.0px",
          "height": "12.0px",
          "color": "rgba(18, 20, 23, 1.0)",
          "fontSize": "16.0px",
          "fontWeight": 700,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "28.0px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 489",
        "style": {
          "left": "0.0px",
          "top": "719.0px",
          "width": "375.0px",
          "height": "93.0px",
          "background": "linear-gradient(135deg, rgba(212, 217, 222, 0.0) 41%, rgba(166, 185, 202, 1.0) 69%)"
        }
      },
      {
        "kind": "shape",
        "name": "image 42",
        "style": {
          "left": "113.0px",
          "top": "705.0px",
          "width": "142.0px",
          "height": "70.0px",
          "background": "rgba(255, 255, 255, 0.2)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "shape",
        "name": "image 43",
        "style": {
          "left": "113.01px",
          "top": "705.0px",
          "width": "141.97px",
          "height": "70.0px",
          "background": "rgba(232, 232, 232, 0.55)",
          "border": "1.0px solid rgba(255, 255, 255, 0.65)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "140.0px",
          "top": "730.0px",
          "width": "18.0px",
          "height": "20.0px",
          "border": "1.5px solid rgba(0, 0, 0, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "Bar",
        "style": {
          "left": "121.0px",
          "top": "799.0px",
          "width": "134.0px",
          "height": "5.0px",
          "background": "rgba(22, 23, 29, 1.0)",
          "borderRadius": "2.5px"
        }
      }
    ]
  },
  {
    "name": "Profile",
    "id": "4001:1747",
    "width": 375,
    "height": 812,
    "layers": [
      {
        "kind": "shape",
        "name": "Vector 1",
        "style": {
          "left": "-66.0px",
          "top": "-100.0px",
          "width": "563.0px",
          "height": "269.5px",
          "background": "linear-gradient(135deg, rgba(125, 175, 220, 1.0) 18%, rgba(252, 236, 206, 1.0) 41%, rgba(251, 227, 141, 1.0) 78%, rgba(253, 236, 183, 1.0) 100%)"
        }
      },
      {
        "kind": "shape",
        "name": "Vector 2",
        "style": {
          "left": "-55.0px",
          "top": "-103.0px",
          "width": "699.0px",
          "height": "318.0px",
          "background": "linear-gradient(135deg, rgba(155, 203, 247, 0.8) 18%, rgba(253, 236, 183, 0.8) 100%)"
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "236.32px",
          "top": "-104.06px",
          "width": "401.52px",
          "height": "399.13px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.09
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "206.42px",
          "top": "-239.0px",
          "width": "64.35px",
          "height": "533.74px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.09
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "-162.11px",
          "top": "-106.82px",
          "width": "398.63px",
          "height": "401.52px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.09
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "236.37px",
          "top": "-209.82px",
          "width": "236.02px",
          "height": "504.55px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.09
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "-268.0px",
          "top": "58.62px",
          "width": "504.56px",
          "height": "236.03px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.09
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "4.64px",
          "top": "-211.33px",
          "width": "231.84px",
          "height": "506.06px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.06
        }
      },
      {
        "kind": "text",
        "name": "Profile",
        "text": "Profile",
        "style": {
          "left": "156.0px",
          "top": "74.0px",
          "width": "63.0px",
          "height": "15.0px",
          "color": "rgba(0, 16, 20, 1.0)",
          "fontSize": "20.0px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "24.6px",
          "textAlign": "center"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 21",
        "style": {
          "left": "24.0px",
          "top": "57.0px",
          "width": "48.0px",
          "height": "48.0px",
          "background": "rgba(240, 243, 245, 0.5)",
          "borderRadius": "24.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 22",
        "style": {
          "left": "303.0px",
          "top": "57.0px",
          "width": "48.0px",
          "height": "48.0px",
          "background": "rgba(240, 243, 245, 0.6)",
          "borderRadius": "24.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Border",
        "style": {
          "left": "314.33px",
          "top": "22.0px",
          "width": "22.0px",
          "height": "11.33px",
          "border": "1.0px solid rgba(0, 0, 0, 1.0)",
          "borderRadius": "2.67px",
          "opacity": 0.35
        }
      },
      {
        "kind": "shape",
        "name": "Capacity",
        "style": {
          "left": "316.33px",
          "top": "24.0px",
          "width": "18.0px",
          "height": "7.33px",
          "background": "rgba(0, 0, 0, 1.0)",
          "borderRadius": "1.33px"
        }
      },
      {
        "kind": "shape",
        "name": "Wifi",
        "style": {
          "left": "294.03px",
          "top": "22.0px",
          "width": "15.27px",
          "height": "10.97px",
          "background": "rgba(0, 0, 0, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "Cellular Connection",
        "style": {
          "left": "272.0px",
          "top": "22.34px",
          "width": "17.0px",
          "height": "10.67px",
          "background": "rgba(0, 0, 0, 1.0)"
        }
      },
      {
        "kind": "text",
        "name": "↳ Time",
        "text": "9:54",
        "style": {
          "left": "25.0px",
          "top": "22.0px",
          "width": "30.0px",
          "height": "10.0px",
          "color": "rgba(0, 0, 0, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 500,
          "fontFamily": "Satoshi Variable, Plus Jakarta Sans, sans-serif",
          "lineHeight": "18.0px",
          "textAlign": "center"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 1000002987",
        "style": {
          "left": "24.0px",
          "top": "124.0px",
          "width": "105.0px",
          "height": "114.0px",
          "backgroundImage": "url(/figma-assets-small/04-2facbdbb22.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat",
          "border": "1.5px solid rgba(241, 248, 255, 1.0)",
          "borderRadius": "24.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Ellipse 5",
        "style": {
          "left": "90.0px",
          "top": "199.0px",
          "width": "30.0px",
          "height": "30.0px",
          "background": "rgba(63, 78, 91, 0.48)",
          "borderRadius": "999px"
        }
      },
      {
        "kind": "shape",
        "name": "Ellipse 4",
        "style": {
          "left": "90.0px",
          "top": "199.0px",
          "width": "30.0px",
          "height": "30.0px",
          "background": "rgba(98, 83, 83, 0.74)",
          "border": "1.0px solid rgba(192, 201, 219, 1.0)",
          "borderRadius": "999px"
        }
      },
      {
        "kind": "text",
        "name": "J. Snow (あなた)",
        "text": "J. Snow (あなた)",
        "style": {
          "left": "145.0px",
          "top": "141.0px",
          "width": "177.0px",
          "height": "16.0px",
          "color": "rgba(0, 16, 20, 1.0)",
          "fontSize": "22.0px",
          "fontWeight": 700,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "27.06px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "17 Km from your location",
        "text": "17 Km from your location ",
        "style": {
          "left": "171.0px",
          "top": "173.0px",
          "width": "151.0px",
          "height": "10.0px",
          "color": "rgba(0, 0, 0, 1.0)",
          "fontSize": "13.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "21.0px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 12",
        "style": {
          "left": "145.0px",
          "top": "203.0px",
          "width": "73.0px",
          "height": "26.0px",
          "background": "rgba(248, 186, 12, 1.0)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "text",
        "name": "Nomad",
        "text": " Nomad",
        "style": {
          "left": "159.0px",
          "top": "211.5px",
          "width": "45.0px",
          "height": "9.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "14.76px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 1000002966",
        "style": {
          "left": "222.0px",
          "top": "203.0px",
          "width": "77.0px",
          "height": "26.0px",
          "background": "rgba(113, 182, 245, 1.0)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "text",
        "name": "Explorer",
        "text": "Explorer",
        "style": {
          "left": "236.0px",
          "top": "211.5px",
          "width": "49.0px",
          "height": "9.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "14.76px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "30",
        "text": "30",
        "style": {
          "left": "57.0px",
          "top": "274.0px",
          "width": "43.0px",
          "height": "24.0px",
          "color": "rgba(0, 16, 20, 1.0)",
          "fontSize": "32.0px",
          "fontWeight": 400,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "39.36px",
          "textAlign": "center"
        }
      },
      {
        "kind": "text",
        "name": "Countries",
        "text": "Countries",
        "style": {
          "left": "47.5px",
          "top": "308.0px",
          "width": "62.0px",
          "height": "10.0px",
          "color": "rgba(0, 16, 20, 1.0)",
          "fontSize": "13.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "21.0px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 2170",
        "style": {
          "left": "132.0px",
          "top": "279.5px",
          "width": "2.0px",
          "height": "33.0px",
          "background": "rgba(217, 217, 217, 1.0)"
        }
      },
      {
        "kind": "text",
        "name": "93",
        "text": "93",
        "style": {
          "left": "166.0px",
          "top": "274.0px",
          "width": "43.0px",
          "height": "24.0px",
          "color": "rgba(0, 16, 20, 1.0)",
          "fontSize": "32.0px",
          "fontWeight": 400,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "39.36px",
          "textAlign": "center"
        }
      },
      {
        "kind": "text",
        "name": "Mountain",
        "text": "Mountain",
        "style": {
          "left": "158.5px",
          "top": "308.0px",
          "width": "58.0px",
          "height": "10.0px",
          "color": "rgba(0, 16, 20, 1.0)",
          "fontSize": "13.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "21.0px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 2171",
        "style": {
          "left": "241.0px",
          "top": "279.5px",
          "width": "2.0px",
          "height": "33.0px",
          "background": "rgba(217, 217, 217, 1.0)"
        }
      },
      {
        "kind": "text",
        "name": "69",
        "text": "69",
        "style": {
          "left": "277.5px",
          "top": "274.0px",
          "width": "38.0px",
          "height": "24.0px",
          "color": "rgba(0, 16, 20, 1.0)",
          "fontSize": "32.0px",
          "fontWeight": 400,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "39.36px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "Cities",
        "text": "Cities",
        "style": {
          "left": "278.0px",
          "top": "308.0px",
          "width": "37.0px",
          "height": "10.0px",
          "color": "rgba(0, 16, 20, 1.0)",
          "fontSize": "13.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "21.0px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "Your Travel Profile",
        "text": "Your Travel Profile",
        "style": {
          "left": "24.0px",
          "top": "358.0px",
          "width": "327.0px",
          "height": "13.0px",
          "color": "rgba(0, 0, 0, 1.0)",
          "fontSize": "18.0px",
          "fontWeight": 700,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "20.16px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 1000002973",
        "style": {
          "left": "24.0px",
          "top": "387.0px",
          "width": "327.0px",
          "height": "70.0px",
          "background": "rgba(249, 249, 249, 1.0)",
          "borderRadius": "18.0px"
        }
      },
      {
        "kind": "shape",
        "name": "image 120",
        "style": {
          "left": "34.0px",
          "top": "399.0px",
          "width": "46.0px",
          "height": "46.0px",
          "backgroundImage": "url(/figma-assets-small/32-d3eeaf0b12.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat"
        }
      },
      {
        "kind": "text",
        "name": "Travel Persona Manager",
        "text": "Travel Persona Manager",
        "style": {
          "left": "88.0px",
          "top": "407.5px",
          "width": "159.0px",
          "height": "10.0px",
          "color": "rgba(0, 16, 20, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "15.68px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "Foodie, Nomad, Explo...",
        "text": "Foodie, Nomad, Explo...",
        "style": {
          "left": "88.0px",
          "top": "427.5px",
          "width": "136.0px",
          "height": "9.0px",
          "color": "rgba(112, 115, 156, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 400,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "13.44px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 1000002974",
        "style": {
          "left": "24.0px",
          "top": "467.0px",
          "width": "327.0px",
          "height": "70.0px",
          "background": "rgba(249, 249, 249, 1.0)",
          "borderRadius": "18.0px"
        }
      },
      {
        "kind": "shape",
        "name": "image 121",
        "style": {
          "left": "34.0px",
          "top": "479.0px",
          "width": "46.0px",
          "height": "46.0px",
          "backgroundImage": "url(/figma-assets-small/21-a0fbf0533b.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat"
        }
      },
      {
        "kind": "text",
        "name": "Saved Places",
        "text": "Saved Places",
        "style": {
          "left": "88.0px",
          "top": "487.5px",
          "width": "109.0px",
          "height": "10.0px",
          "color": "rgba(0, 16, 20, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "15.68px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "65 Destination Wanderlust",
        "text": "65 Destination Wanderlust ",
        "style": {
          "left": "88.0px",
          "top": "507.5px",
          "width": "150.0px",
          "height": "9.0px",
          "color": "rgba(112, 115, 156, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 400,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "13.44px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 1000002975",
        "style": {
          "left": "24.0px",
          "top": "547.0px",
          "width": "327.0px",
          "height": "70.0px",
          "background": "rgba(249, 249, 249, 1.0)",
          "borderRadius": "18.0px"
        }
      },
      {
        "kind": "shape",
        "name": "image 123",
        "style": {
          "left": "34.0px",
          "top": "559.0px",
          "width": "46.0px",
          "height": "46.0px",
          "backgroundImage": "url(/figma-assets-small/13-6e50029b6e.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat"
        }
      },
      {
        "kind": "text",
        "name": "Saved Trips",
        "text": "Saved Trips",
        "style": {
          "left": "88.0px",
          "top": "567.5px",
          "width": "109.0px",
          "height": "10.0px",
          "color": "rgba(0, 16, 20, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "15.68px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "8 Upcoming Trips",
        "text": "8 Upcoming Trips",
        "style": {
          "left": "88.0px",
          "top": "587.5px",
          "width": "109.0px",
          "height": "9.0px",
          "color": "rgba(112, 115, 156, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 400,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "13.44px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "Your Preferences",
        "text": "Your Preferences ",
        "style": {
          "left": "24.0px",
          "top": "645.0px",
          "width": "327.0px",
          "height": "13.0px",
          "color": "rgba(0, 0, 0, 1.0)",
          "fontSize": "18.0px",
          "fontWeight": 700,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "20.16px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 1000002977",
        "style": {
          "left": "24.0px",
          "top": "674.0px",
          "width": "327.0px",
          "height": "70.0px",
          "background": "rgba(249, 249, 249, 1.0)",
          "borderRadius": "18.0px"
        }
      },
      {
        "kind": "shape",
        "name": "image 126",
        "style": {
          "left": "34.0px",
          "top": "686.0px",
          "width": "46.0px",
          "height": "46.0px",
          "backgroundImage": "url(/figma-assets-small/16-8e6b0a3a88.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat"
        }
      },
      {
        "kind": "text",
        "name": "Notification",
        "text": "Notification",
        "style": {
          "left": "88.0px",
          "top": "694.5px",
          "width": "109.0px",
          "height": "10.0px",
          "color": "rgba(0, 16, 20, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "15.68px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "Trip Reminder, Golden ...",
        "text": "Trip Reminder, Golden ...",
        "style": {
          "left": "88.0px",
          "top": "714.5px",
          "width": "137.0px",
          "height": "9.0px",
          "color": "rgba(112, 115, 156, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 400,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "13.44px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 1000002976",
        "style": {
          "left": "24.0px",
          "top": "754.0px",
          "width": "327.0px",
          "height": "70.0px",
          "background": "rgba(249, 249, 249, 1.0)",
          "borderRadius": "18.0px"
        }
      },
      {
        "kind": "shape",
        "name": "image 127",
        "style": {
          "left": "34.0px",
          "top": "766.0px",
          "width": "46.0px",
          "height": "46.0px",
          "backgroundImage": "url(/figma-assets-small/40-f634e7afdf.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat"
        }
      },
      {
        "kind": "text",
        "name": "Language",
        "text": "Language",
        "style": {
          "left": "88.0px",
          "top": "774.5px",
          "width": "109.0px",
          "height": "10.0px",
          "color": "rgba(0, 16, 20, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "15.68px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "English",
        "text": "English",
        "style": {
          "left": "88.0px",
          "top": "794.5px",
          "width": "109.0px",
          "height": "9.0px",
          "color": "rgba(112, 115, 156, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 400,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "13.44px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 1000002976",
        "style": {
          "left": "429.0px",
          "top": "637.0px",
          "width": "327.0px",
          "height": "70.0px",
          "background": "rgba(249, 249, 249, 1.0)",
          "borderRadius": "18.0px"
        }
      },
      {
        "kind": "shape",
        "name": "image 120",
        "style": {
          "left": "439.0px",
          "top": "649.0px",
          "width": "46.0px",
          "height": "46.0px",
          "backgroundImage": "url(/figma-assets-small/32-d3eeaf0b12.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat"
        }
      },
      {
        "kind": "text",
        "name": "Physical activity",
        "text": "Physical activity",
        "style": {
          "left": "493.0px",
          "top": "657.5px",
          "width": "109.0px",
          "height": "10.0px",
          "color": "rgba(0, 16, 20, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "15.68px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "2 days ago",
        "text": "2 days ago",
        "style": {
          "left": "493.0px",
          "top": "677.5px",
          "width": "109.0px",
          "height": "9.0px",
          "color": "rgba(0, 16, 20, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 400,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "13.44px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 489",
        "style": {
          "left": "0.0px",
          "top": "719.0px",
          "width": "375.0px",
          "height": "93.0px",
          "background": "linear-gradient(135deg, rgba(212, 217, 222, 0.0) 41%, rgba(166, 185, 202, 1.0) 69%)"
        }
      },
      {
        "kind": "shape",
        "name": "Bar",
        "style": {
          "left": "121.0px",
          "top": "799.0px",
          "width": "134.0px",
          "height": "5.0px",
          "background": "rgba(22, 23, 29, 1.0)",
          "borderRadius": "2.5px"
        }
      },
      {
        "kind": "shape",
        "name": "image 42",
        "style": {
          "left": "113.0px",
          "top": "705.0px",
          "width": "142.0px",
          "height": "70.0px",
          "background": "rgba(255, 255, 255, 0.2)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "shape",
        "name": "image 43",
        "style": {
          "left": "113.01px",
          "top": "705.0px",
          "width": "141.97px",
          "height": "70.0px",
          "background": "rgba(232, 232, 232, 0.55)",
          "border": "1.0px solid rgba(255, 255, 255, 0.65)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "140.0px",
          "top": "730.0px",
          "width": "18.0px",
          "height": "20.0px",
          "border": "1.5px solid rgba(0, 0, 0, 1.0)"
        }
      }
    ]
  },
  {
    "name": "Place Details Page",
    "id": "4001:1898",
    "width": 375,
    "height": 812,
    "layers": [
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "104.23px",
          "top": "-239.0px",
          "width": "64.35px",
          "height": "533.74px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.09
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "138.48px",
          "top": "-106.82px",
          "width": "398.63px",
          "height": "401.52px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.09
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "-97.39px",
          "top": "-209.82px",
          "width": "236.02px",
          "height": "504.55px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.09
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "138.44px",
          "top": "58.62px",
          "width": "504.56px",
          "height": "236.03px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.09
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "138.52px",
          "top": "-211.33px",
          "width": "231.84px",
          "height": "506.06px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.06
        }
      },
      {
        "kind": "shape",
        "name": "Rec",
        "style": {
          "left": "0.0px",
          "top": "0.0px",
          "width": "375.0px",
          "height": "812.0px",
          "backgroundImage": "url(/figma-assets-small/34-d6bfa8a0f5.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat"
        }
      },
      {
        "kind": "shape",
        "name": "Rec",
        "style": {
          "left": "0.0px",
          "top": "0.0px",
          "width": "375.0px",
          "height": "812.0px",
          "background": "linear-gradient(135deg, rgba(88, 132, 145, 0.0) 39%, rgba(40, 66, 75, 0.633) 49%, rgba(5, 45, 61, 1.0) 97%)"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 2172",
        "style": {
          "left": "0.0px",
          "top": "0.0px",
          "width": "375.0px",
          "height": "116.0px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 0.0) 11%, rgba(58, 115, 135, 0.3) 100%)"
        }
      },
      {
        "kind": "text",
        "name": "Mount Daisen(いせ)",
        "text": "Mount \nDaisen(いせ)",
        "style": {
          "left": "24.0px",
          "top": "416.0px",
          "width": "311.0px",
          "height": "97.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "54.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "59.4px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "Absolutely breathtaking views! The hike was challenging but rewarding. Highly recommend visiting during the autumn for the vibrant foliage...",
        "text": "Absolutely breathtaking views! The hike was challenging but rewarding. Highly recommend visiting during the autumn for the vibrant foliage...",
        "style": {
          "left": "24.0px",
          "top": "543.0px",
          "width": "327.0px",
          "height": "85.0px",
          "color": "rgba(234, 246, 251, 1.0)",
          "fontSize": "17.0px",
          "fontWeight": 400,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "24.0px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "Reviews",
        "text": "Reviews",
        "style": {
          "left": "24.0px",
          "top": "660.0px",
          "width": "86.0px",
          "height": "23.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "18.0px",
          "fontWeight": 700,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "23.0px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "4.8",
        "text": "4.8",
        "style": {
          "left": "24.0px",
          "top": "692.0px",
          "width": "76.89px",
          "height": "36.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "28.0px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "35.31px",
          "letterSpacing": "-0.785px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "1.2k reviews",
        "text": "1.2k reviews",
        "style": {
          "left": "24.0px",
          "top": "759.0px",
          "width": "76.89px",
          "height": "9.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "12.55px",
          "fontWeight": 400,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "18.83px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "image 42",
        "style": {
          "left": "186.0px",
          "top": "702.0px",
          "width": "165.0px",
          "height": "70.0px",
          "background": "rgba(255, 255, 255, 0.2)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "shape",
        "name": "image 43",
        "style": {
          "left": "186.02px",
          "top": "702.0px",
          "width": "164.97px",
          "height": "70.0px",
          "border": "1.0px solid rgba(66, 97, 113, 0.65)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "text",
        "name": "CONTINUE",
        "text": "CONTINUE",
        "style": {
          "left": "215.0px",
          "top": "731.0px",
          "width": "84.0px",
          "height": "12.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "16.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "21.0px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Border",
        "style": {
          "left": "314.33px",
          "top": "22.0px",
          "width": "22.0px",
          "height": "11.33px",
          "border": "1.0px solid rgba(0, 0, 0, 1.0)",
          "borderRadius": "2.67px",
          "opacity": 0.35
        }
      },
      {
        "kind": "shape",
        "name": "Capacity",
        "style": {
          "left": "316.33px",
          "top": "24.0px",
          "width": "18.0px",
          "height": "7.33px",
          "background": "rgba(0, 0, 0, 1.0)",
          "borderRadius": "1.33px"
        }
      },
      {
        "kind": "shape",
        "name": "Wifi",
        "style": {
          "left": "294.03px",
          "top": "22.0px",
          "width": "15.27px",
          "height": "10.97px",
          "background": "rgba(0, 0, 0, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "Cellular Connection",
        "style": {
          "left": "272.0px",
          "top": "22.34px",
          "width": "17.0px",
          "height": "10.67px",
          "background": "rgba(0, 0, 0, 1.0)"
        }
      },
      {
        "kind": "text",
        "name": "↳ Time",
        "text": "9:54",
        "style": {
          "left": "25.0px",
          "top": "22.0px",
          "width": "30.0px",
          "height": "10.0px",
          "color": "rgba(0, 0, 0, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 500,
          "fontFamily": "Satoshi Variable, Plus Jakarta Sans, sans-serif",
          "lineHeight": "18.0px",
          "textAlign": "center"
        }
      },
      {
        "kind": "text",
        "name": "Place Overview",
        "text": "Place Overview",
        "style": {
          "left": "112.0px",
          "top": "74.0px",
          "width": "151.0px",
          "height": "15.0px",
          "color": "rgba(0, 16, 20, 1.0)",
          "fontSize": "20.0px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "24.6px",
          "textAlign": "center"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 21",
        "style": {
          "left": "24.0px",
          "top": "57.0px",
          "width": "48.0px",
          "height": "48.0px",
          "background": "rgba(240, 243, 245, 0.5)",
          "borderRadius": "24.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 22",
        "style": {
          "left": "303.0px",
          "top": "57.0px",
          "width": "48.0px",
          "height": "48.0px",
          "background": "rgba(240, 243, 245, 0.6)",
          "borderRadius": "24.0px"
        }
      }
    ]
  },
  {
    "name": "Local Experiences & Food- Explore",
    "id": "4001:1976",
    "width": 375,
    "height": 812,
    "layers": [
      {
        "kind": "shape",
        "name": "Vector 1",
        "style": {
          "left": "-41.0px",
          "top": "-100.0px",
          "width": "513.0px",
          "height": "246.0px",
          "background": "linear-gradient(135deg, rgba(125, 175, 220, 1.0) 18%, rgba(252, 236, 206, 1.0) 41%, rgba(251, 227, 141, 1.0) 78%, rgba(253, 236, 183, 1.0) 100%)"
        }
      },
      {
        "kind": "shape",
        "name": "Vector 2",
        "style": {
          "left": "-55.0px",
          "top": "-103.0px",
          "width": "699.0px",
          "height": "334.0px",
          "background": "linear-gradient(135deg, rgba(155, 203, 247, 0.8) 18%, rgba(253, 236, 183, 0.8) 100%)"
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "236.32px",
          "top": "-104.06px",
          "width": "401.52px",
          "height": "399.13px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.09
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "206.42px",
          "top": "-239.0px",
          "width": "64.35px",
          "height": "533.74px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.07
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "-162.11px",
          "top": "-106.82px",
          "width": "398.63px",
          "height": "401.52px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.07
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "236.37px",
          "top": "-209.82px",
          "width": "236.02px",
          "height": "504.55px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.07
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "-268.0px",
          "top": "58.62px",
          "width": "504.56px",
          "height": "236.03px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.09
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "4.64px",
          "top": "-211.33px",
          "width": "231.84px",
          "height": "506.06px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.05
        }
      },
      {
        "kind": "text",
        "name": "Explore",
        "text": "Explore",
        "style": {
          "left": "150.0px",
          "top": "74.0px",
          "width": "74.0px",
          "height": "15.0px",
          "color": "rgba(0, 16, 20, 1.0)",
          "fontSize": "20.0px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "24.6px",
          "textAlign": "center"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 21",
        "style": {
          "left": "24.0px",
          "top": "57.0px",
          "width": "48.0px",
          "height": "48.0px",
          "background": "rgba(240, 243, 245, 0.5)",
          "borderRadius": "24.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 22",
        "style": {
          "left": "303.0px",
          "top": "57.0px",
          "width": "48.0px",
          "height": "48.0px",
          "background": "rgba(240, 243, 245, 0.6)",
          "borderRadius": "24.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Border",
        "style": {
          "left": "314.33px",
          "top": "22.0px",
          "width": "22.0px",
          "height": "11.33px",
          "border": "1.0px solid rgba(0, 0, 0, 1.0)",
          "borderRadius": "2.67px",
          "opacity": 0.35
        }
      },
      {
        "kind": "shape",
        "name": "Capacity",
        "style": {
          "left": "316.33px",
          "top": "24.0px",
          "width": "18.0px",
          "height": "7.33px",
          "background": "rgba(0, 0, 0, 1.0)",
          "borderRadius": "1.33px"
        }
      },
      {
        "kind": "shape",
        "name": "Wifi",
        "style": {
          "left": "294.03px",
          "top": "22.0px",
          "width": "15.27px",
          "height": "10.97px",
          "background": "rgba(0, 0, 0, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "Cellular Connection",
        "style": {
          "left": "272.0px",
          "top": "22.34px",
          "width": "17.0px",
          "height": "10.67px",
          "background": "rgba(0, 0, 0, 1.0)"
        }
      },
      {
        "kind": "text",
        "name": "↳ Time",
        "text": "9:54",
        "style": {
          "left": "25.0px",
          "top": "22.0px",
          "width": "30.0px",
          "height": "10.0px",
          "color": "rgba(0, 0, 0, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 500,
          "fontFamily": "Satoshi Variable, Plus Jakarta Sans, sans-serif",
          "lineHeight": "18.0px",
          "textAlign": "center"
        }
      },
      {
        "kind": "text",
        "name": "Local Gems Around You",
        "text": " Local Gems Around You",
        "style": {
          "left": "24.0px",
          "top": "133.0px",
          "width": "210.0px",
          "height": "13.0px",
          "color": "rgba(18, 20, 23, 1.0)",
          "fontSize": "18.0px",
          "fontWeight": 700,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "28.0px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "Feel the city's heartbeat through food & festivals.",
        "text": "Feel the city's heartbeat through food & festivals.",
        "style": {
          "left": "24.0px",
          "top": "162.0px",
          "width": "277.0px",
          "height": "9.0px",
          "color": "rgba(18, 20, 23, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 400,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "21.0px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 12",
        "style": {
          "left": "24.0px",
          "top": "191.0px",
          "width": "109.0px",
          "height": "34.0px",
          "background": "rgba(248, 186, 12, 1.0)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "text",
        "name": "Street Food",
        "text": "Street Food",
        "style": {
          "left": "38.0px",
          "top": "203.0px",
          "width": "81.0px",
          "height": "10.0px",
          "color": "rgba(18, 20, 23, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "17.22px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 16",
        "style": {
          "left": "139.0px",
          "top": "191.0px",
          "width": "128.0px",
          "height": "34.0px",
          "background": "rgba(255, 255, 255, 1.0)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "text",
        "name": "Cultural Events",
        "text": "Cultural Events",
        "style": {
          "left": "153.0px",
          "top": "203.0px",
          "width": "100.0px",
          "height": "10.0px",
          "color": "rgba(18, 20, 23, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "17.22px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 15",
        "style": {
          "left": "273.0px",
          "top": "191.0px",
          "width": "128.0px",
          "height": "34.0px",
          "background": "rgba(255, 255, 255, 1.0)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "text",
        "name": "DIY Local Tours",
        "text": "DIY Local Tours",
        "style": {
          "left": "287.0px",
          "top": "203.0px",
          "width": "100.0px",
          "height": "10.0px",
          "color": "rgba(18, 20, 23, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "17.22px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 17",
        "style": {
          "left": "407.0px",
          "top": "191.0px",
          "width": "113.0px",
          "height": "34.0px",
          "background": "rgba(255, 255, 255, 1.0)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "text",
        "name": "Hotel",
        "text": "Hidden Gem",
        "style": {
          "left": "421.0px",
          "top": "203.0px",
          "width": "85.0px",
          "height": "10.0px",
          "color": "rgba(248, 186, 12, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "17.22px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "image 130",
        "style": {
          "left": "24.0px",
          "top": "242.0px",
          "width": "327.0px",
          "height": "226.0px",
          "background": "rgba(249, 249, 249, 1.0)",
          "borderRadius": "28.0px"
        }
      },
      {
        "kind": "shape",
        "name": "image",
        "style": {
          "left": "24.0px",
          "top": "242.5px",
          "width": "327.0px",
          "height": "126.0px",
          "backgroundImage": "url(/figma-assets-small/23-a119864138.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat",
          "borderRadius": "24.0px"
        }
      },
      {
        "kind": "text",
        "name": "Takoyaki (たこ焼き)",
        "text": "Takoyaki (たこ焼き)",
        "style": {
          "left": "44.0px",
          "top": "392.5px",
          "width": "287.0px",
          "height": "13.0px",
          "color": "rgba(0, 16, 20, 1.0)",
          "fontSize": "18.0px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "20.16px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "Octopus balls with crispy...",
        "text": "Octopus balls with crispy...",
        "style": {
          "left": "44.0px",
          "top": "414.5px",
          "width": "287.0px",
          "height": "9.0px",
          "color": "rgba(112, 115, 156, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 400,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "13.44px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "Found in Osaka",
        "text": "Found in Osaka",
        "style": {
          "left": "64.0px",
          "top": "436.0px",
          "width": "74.0px",
          "height": "7.0px",
          "color": "rgba(112, 115, 156, 1.0)",
          "fontSize": "10.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "21.0px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "1.2k reviews",
        "text": "1.2k reviews",
        "style": {
          "left": "167.0px",
          "top": "436.0px",
          "width": "76.89px",
          "height": "7.0px",
          "color": "rgba(112, 115, 156, 1.0)",
          "fontSize": "10.0px",
          "fontWeight": 400,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "18.83px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "image 130",
        "style": {
          "left": "24.0px",
          "top": "480.0px",
          "width": "327.0px",
          "height": "226.0px",
          "background": "rgba(249, 249, 249, 1.0)",
          "borderRadius": "28.0px"
        }
      },
      {
        "kind": "shape",
        "name": "image",
        "style": {
          "left": "24.0px",
          "top": "480.5px",
          "width": "327.0px",
          "height": "126.0px",
          "backgroundImage": "url(/figma-assets-small/25-bd99a5376d.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat",
          "borderRadius": "24.0px"
        }
      },
      {
        "kind": "text",
        "name": "Tempura (天ぷら)",
        "text": "Tempura (天ぷら)",
        "style": {
          "left": "44.0px",
          "top": "630.5px",
          "width": "287.0px",
          "height": "13.0px",
          "color": "rgba(0, 16, 20, 1.0)",
          "fontSize": "18.0px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "20.16px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "Crispy deep-fried vegetables and shrimp.",
        "text": "Crispy deep-fried vegetables and shrimp.",
        "style": {
          "left": "44.0px",
          "top": "652.5px",
          "width": "287.0px",
          "height": "9.0px",
          "color": "rgba(112, 115, 156, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 400,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "13.44px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "Yanki Street",
        "text": "Yanki Street",
        "style": {
          "left": "64.0px",
          "top": "674.0px",
          "width": "58.0px",
          "height": "7.0px",
          "color": "rgba(112, 115, 156, 1.0)",
          "fontSize": "10.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "21.0px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "1.8k reviews",
        "text": "1.8k reviews",
        "style": {
          "left": "151.0px",
          "top": "674.0px",
          "width": "76.89px",
          "height": "7.0px",
          "color": "rgba(113, 116, 157, 1.0)",
          "fontSize": "10.0px",
          "fontWeight": 400,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "21.0px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "image 130",
        "style": {
          "left": "24.0px",
          "top": "718.0px",
          "width": "327.0px",
          "height": "226.0px",
          "background": "rgba(249, 249, 249, 1.0)",
          "borderRadius": "28.0px"
        }
      },
      {
        "kind": "shape",
        "name": "image",
        "style": {
          "left": "24.0px",
          "top": "718.0px",
          "width": "327.0px",
          "height": "126.0px",
          "backgroundImage": "url(/figma-assets-small/24-a9720e8f0e.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat",
          "borderRadius": "24.0px"
        }
      },
      {
        "kind": "text",
        "name": "Kushiyaki (串焼き)",
        "text": "Kushiyaki (串焼き)",
        "style": {
          "left": "44.0px",
          "top": "868.0px",
          "width": "287.0px",
          "height": "13.0px",
          "color": "rgba(0, 16, 20, 1.0)",
          "fontSize": "18.0px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "20.16px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "Skewered meat grilled with tare sauce ...",
        "text": "Skewered meat grilled with tare sauce ...",
        "style": {
          "left": "44.0px",
          "top": "890.0px",
          "width": "287.0px",
          "height": "9.0px",
          "color": "rgba(112, 115, 156, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 400,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "13.44px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "Yanki Street",
        "text": "Yanki Street",
        "style": {
          "left": "64.0px",
          "top": "911.5px",
          "width": "58.0px",
          "height": "7.0px",
          "color": "rgba(112, 115, 156, 1.0)",
          "fontSize": "10.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "21.0px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "1.8k reviews",
        "text": "1.8k reviews",
        "style": {
          "left": "151.12px",
          "top": "911.0px",
          "width": "76.89px",
          "height": "9.0px",
          "color": "rgba(0, 16, 20, 1.0)",
          "fontSize": "12.55px",
          "fontWeight": 400,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "18.83px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 489",
        "style": {
          "left": "0.0px",
          "top": "719.0px",
          "width": "375.0px",
          "height": "93.0px",
          "background": "linear-gradient(135deg, rgba(212, 217, 222, 0.0) 41%, rgba(166, 185, 202, 1.0) 69%)"
        }
      },
      {
        "kind": "shape",
        "name": "image 42",
        "style": {
          "left": "113.0px",
          "top": "705.0px",
          "width": "142.0px",
          "height": "70.0px",
          "background": "rgba(255, 255, 255, 0.2)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "shape",
        "name": "image 43",
        "style": {
          "left": "113.01px",
          "top": "705.0px",
          "width": "141.97px",
          "height": "70.0px",
          "background": "rgba(232, 232, 232, 0.55)",
          "border": "1.0px solid rgba(255, 255, 255, 0.65)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "140.0px",
          "top": "730.0px",
          "width": "18.0px",
          "height": "20.0px",
          "border": "1.5px solid rgba(0, 0, 0, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "Bar",
        "style": {
          "left": "121.0px",
          "top": "799.0px",
          "width": "134.0px",
          "height": "5.0px",
          "background": "rgba(22, 23, 29, 1.0)",
          "borderRadius": "2.5px"
        }
      }
    ]
  },
  {
    "name": "Booking Hub",
    "id": "4001:2113",
    "width": 375,
    "height": 812,
    "layers": [
      {
        "kind": "shape",
        "name": "Vector 1",
        "style": {
          "left": "-41.0px",
          "top": "-100.0px",
          "width": "513.0px",
          "height": "246.0px",
          "background": "linear-gradient(135deg, rgba(125, 175, 220, 1.0) 18%, rgba(252, 236, 206, 1.0) 41%, rgba(251, 227, 141, 1.0) 78%, rgba(253, 236, 183, 1.0) 100%)"
        }
      },
      {
        "kind": "shape",
        "name": "Vector 2",
        "style": {
          "left": "-55.0px",
          "top": "-103.0px",
          "width": "699.0px",
          "height": "334.0px",
          "background": "linear-gradient(135deg, rgba(155, 203, 247, 0.8) 18%, rgba(253, 236, 183, 0.8) 100%)"
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "236.32px",
          "top": "-104.06px",
          "width": "401.52px",
          "height": "399.13px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.09
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "206.42px",
          "top": "-239.0px",
          "width": "64.35px",
          "height": "533.74px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.07
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "-162.11px",
          "top": "-106.82px",
          "width": "398.63px",
          "height": "401.52px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.07
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "236.37px",
          "top": "-209.82px",
          "width": "236.02px",
          "height": "504.55px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.07
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "-268.0px",
          "top": "58.62px",
          "width": "504.56px",
          "height": "236.03px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.09
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "4.64px",
          "top": "-211.33px",
          "width": "231.84px",
          "height": "506.06px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.05
        }
      },
      {
        "kind": "text",
        "name": "Explore",
        "text": "Explore",
        "style": {
          "left": "150.0px",
          "top": "74.0px",
          "width": "74.0px",
          "height": "15.0px",
          "color": "rgba(0, 16, 20, 1.0)",
          "fontSize": "20.0px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "24.6px",
          "textAlign": "center"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 21",
        "style": {
          "left": "24.0px",
          "top": "57.0px",
          "width": "48.0px",
          "height": "48.0px",
          "background": "rgba(240, 243, 245, 0.5)",
          "borderRadius": "24.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 22",
        "style": {
          "left": "303.0px",
          "top": "57.0px",
          "width": "48.0px",
          "height": "48.0px",
          "background": "rgba(240, 243, 245, 0.6)",
          "borderRadius": "24.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Border",
        "style": {
          "left": "314.33px",
          "top": "22.0px",
          "width": "22.0px",
          "height": "11.33px",
          "border": "1.0px solid rgba(0, 0, 0, 1.0)",
          "borderRadius": "2.67px",
          "opacity": 0.35
        }
      },
      {
        "kind": "shape",
        "name": "Capacity",
        "style": {
          "left": "316.33px",
          "top": "24.0px",
          "width": "18.0px",
          "height": "7.33px",
          "background": "rgba(0, 0, 0, 1.0)",
          "borderRadius": "1.33px"
        }
      },
      {
        "kind": "shape",
        "name": "Wifi",
        "style": {
          "left": "294.03px",
          "top": "22.0px",
          "width": "15.27px",
          "height": "10.97px",
          "background": "rgba(0, 0, 0, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "Cellular Connection",
        "style": {
          "left": "272.0px",
          "top": "22.34px",
          "width": "17.0px",
          "height": "10.67px",
          "background": "rgba(0, 0, 0, 1.0)"
        }
      },
      {
        "kind": "text",
        "name": "↳ Time",
        "text": "9:54",
        "style": {
          "left": "25.0px",
          "top": "22.0px",
          "width": "30.0px",
          "height": "10.0px",
          "color": "rgba(0, 0, 0, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 500,
          "fontFamily": "Satoshi Variable, Plus Jakarta Sans, sans-serif",
          "lineHeight": "18.0px",
          "textAlign": "center"
        }
      },
      {
        "kind": "text",
        "name": "Booking Hub",
        "text": "Booking Hub",
        "style": {
          "left": "24.0px",
          "top": "133.0px",
          "width": "113.0px",
          "height": "13.0px",
          "color": "rgba(18, 20, 23, 1.0)",
          "fontSize": "18.0px",
          "fontWeight": 700,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "28.0px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "Personalized bookings for your Japan Journey",
        "text": "Personalized bookings for your Japan Journey",
        "style": {
          "left": "24.0px",
          "top": "162.0px",
          "width": "256.0px",
          "height": "9.0px",
          "color": "rgba(18, 20, 23, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 400,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "21.0px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 12",
        "style": {
          "left": "24.0px",
          "top": "191.0px",
          "width": "45.0px",
          "height": "34.0px",
          "background": "rgba(248, 186, 12, 1.0)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "text",
        "name": "All",
        "text": "All",
        "style": {
          "left": "38.0px",
          "top": "203.0px",
          "width": "17.0px",
          "height": "10.0px",
          "color": "rgba(18, 20, 23, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "17.22px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 16",
        "style": {
          "left": "75.0px",
          "top": "191.0px",
          "width": "65.0px",
          "height": "34.0px",
          "background": "rgba(255, 255, 255, 1.0)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "text",
        "name": "Hotel",
        "text": "Hotel",
        "style": {
          "left": "89.0px",
          "top": "203.0px",
          "width": "37.0px",
          "height": "10.0px",
          "color": "rgba(18, 20, 23, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "17.22px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 15",
        "style": {
          "left": "146.0px",
          "top": "191.0px",
          "width": "78.0px",
          "height": "34.0px",
          "background": "rgba(255, 255, 255, 1.0)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "text",
        "name": "Ryokan",
        "text": "Ryokan",
        "style": {
          "left": "160.0px",
          "top": "203.0px",
          "width": "50.0px",
          "height": "10.0px",
          "color": "rgba(18, 20, 23, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "17.22px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 17",
        "style": {
          "left": "230.0px",
          "top": "191.0px",
          "width": "73.0px",
          "height": "34.0px",
          "background": "rgba(255, 255, 255, 1.0)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "text",
        "name": "Hotel",
        "text": "Airbnb",
        "style": {
          "left": "244.0px",
          "top": "203.0px",
          "width": "45.0px",
          "height": "10.0px",
          "color": "rgba(18, 20, 23, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "17.22px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "image",
        "style": {
          "left": "24.0px",
          "top": "253.0px",
          "width": "265.14px",
          "height": "219.74px",
          "backgroundImage": "url(/figma-assets-small/12-6db94ea14f.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat",
          "borderRadius": "24.33px"
        }
      },
      {
        "kind": "shape",
        "name": "image",
        "style": {
          "left": "32.11px",
          "top": "380.3px",
          "width": "248.93px",
          "height": "84.33px",
          "background": "linear-gradient(135deg, rgba(230, 242, 254, 0.0) 35%, rgba(230, 242, 254, 0.1) 97%)",
          "border": "0.81px solid rgba(75, 145, 164, 0.2)",
          "borderRadius": "21.08px"
        }
      },
      {
        "kind": "text",
        "name": "Kyoto Zen (あなた)",
        "text": "Kyoto Zen (あなた)",
        "style": {
          "left": "46.7px",
          "top": "394.9px",
          "width": "143.0px",
          "height": "12.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "16.22px",
          "fontWeight": 700,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "22.7px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "Gion District, Kyoto",
        "text": "Gion District, Kyoto",
        "style": {
          "left": "62.92px",
          "top": "419.3px",
          "width": "76.0px",
          "height": "6.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "8.11px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "17.03px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 21",
        "style": {
          "left": "237.25px",
          "top": "265.97px",
          "width": "38.92px",
          "height": "38.92px",
          "background": "linear-gradient(135deg, rgba(53, 66, 77, 0.0) 0%, rgba(27, 42, 57, 0.33) 69%)",
          "borderRadius": "21.08px"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 12",
        "style": {
          "left": "188.6px",
          "top": "424.09px",
          "width": "79.7px",
          "height": "27.57px",
          "background": "rgba(248, 186, 12, 1.0)",
          "borderRadius": "21.08px"
        }
      },
      {
        "kind": "text",
        "name": "Book Now",
        "text": "Book Now",
        "style": {
          "left": "199.95px",
          "top": "433.87px",
          "width": "57.0px",
          "height": "8.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "11.35px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "13.96px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "$150.00",
        "text": "$150.00",
        "style": {
          "left": "46.7px",
          "top": "439.49px",
          "width": "68.0px",
          "height": "12.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "16.22px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "17.03px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 1000003002",
        "style": {
          "left": "35.7px",
          "top": "264.7px",
          "width": "53.31px",
          "height": "32.51px",
          "background": "linear-gradient(135deg, rgba(53, 66, 77, 0.0) 0%, rgba(27, 42, 57, 0.35) 69%)",
          "borderRadius": "21.08px"
        }
      },
      {
        "kind": "text",
        "name": "4.9",
        "text": "4.9",
        "style": {
          "left": "61.25px",
          "top": "277.45px",
          "width": "16.0px",
          "height": "7.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "9.73px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "17.03px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "image",
        "style": {
          "left": "300.0px",
          "top": "269.0px",
          "width": "232.88px",
          "height": "193.0px",
          "backgroundImage": "url(/figma-assets-small/12-6db94ea14f.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat",
          "borderRadius": "21.37px"
        }
      },
      {
        "kind": "shape",
        "name": "image",
        "style": {
          "left": "307.12px",
          "top": "380.81px",
          "width": "218.64px",
          "height": "74.07px",
          "background": "linear-gradient(135deg, rgba(230, 242, 254, 0.0) 35%, rgba(230, 242, 254, 0.08) 97%)",
          "border": "0.71px solid rgba(75, 145, 164, 0.2)",
          "borderRadius": "18.52px"
        }
      },
      {
        "kind": "text",
        "name": "Kyoto Zen (あなた)",
        "text": "Kyoto Zen (あなた)",
        "style": {
          "left": "319.94px",
          "top": "393.63px",
          "width": "126.0px",
          "height": "11.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "14.24px",
          "fontWeight": 700,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "19.94px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "Gion District, Kyoto",
        "text": "Gion District, Kyoto",
        "style": {
          "left": "334.18px",
          "top": "415.66px",
          "width": "66.0px",
          "height": "5.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "7.12px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "14.96px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 21",
        "style": {
          "left": "487.3px",
          "top": "280.39px",
          "width": "34.18px",
          "height": "34.18px",
          "background": "linear-gradient(135deg, rgba(53, 66, 77, 0.0) 0%, rgba(27, 42, 57, 0.33) 69%)",
          "borderRadius": "18.52px"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 12",
        "style": {
          "left": "444.57px",
          "top": "419.27px",
          "width": "69.94px",
          "height": "24.21px",
          "background": "rgba(248, 186, 12, 1.0)",
          "borderRadius": "18.52px"
        }
      },
      {
        "kind": "text",
        "name": "Book Now",
        "text": "Book Now",
        "style": {
          "left": "454.54px",
          "top": "427.88px",
          "width": "50.0px",
          "height": "7.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "9.97px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "12.26px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "$150.00",
        "text": "$150.00",
        "style": {
          "left": "319.94px",
          "top": "432.8px",
          "width": "60.0px",
          "height": "11.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "14.24px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "14.96px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 1000003002",
        "style": {
          "left": "310.28px",
          "top": "279.28px",
          "width": "46.82px",
          "height": "28.55px",
          "background": "linear-gradient(135deg, rgba(53, 66, 77, 0.0) 0%, rgba(27, 42, 57, 0.35) 69%)",
          "borderRadius": "18.52px"
        }
      },
      {
        "kind": "text",
        "name": "4.9",
        "text": "4.9",
        "style": {
          "left": "332.74px",
          "top": "290.55px",
          "width": "14.0px",
          "height": "6.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "8.55px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "14.96px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "Local Events",
        "text": "Local Events",
        "style": {
          "left": "24.0px",
          "top": "501.0px",
          "width": "110.0px",
          "height": "13.0px",
          "color": "rgba(18, 20, 23, 1.0)",
          "fontSize": "18.0px",
          "fontWeight": 700,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "28.0px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "See All",
        "text": "See All",
        "style": {
          "left": "299.0px",
          "top": "501.0px",
          "width": "52.0px",
          "height": "12.0px",
          "color": "rgba(18, 72, 127, 1.0)",
          "fontSize": "16.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "21.0px",
          "textAlign": "right"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 1000003010",
        "style": {
          "left": "24.0px",
          "top": "530.0px",
          "width": "327.0px",
          "height": "121.0px",
          "background": "rgba(249, 249, 249, 1.0)",
          "borderRadius": "28.0px"
        }
      },
      {
        "kind": "shape",
        "name": "image",
        "style": {
          "left": "32.0px",
          "top": "538.0px",
          "width": "97.0px",
          "height": "105.0px",
          "backgroundImage": "url(/figma-assets-small/29-c6753f81ac.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat",
          "borderRadius": "24.0px"
        }
      },
      {
        "kind": "text",
        "name": "Ramen Night (ラナト)",
        "text": "Ramen Night (ラナト)",
        "style": {
          "left": "143.0px",
          "top": "547.5px",
          "width": "185.0px",
          "height": "16.0px",
          "color": "rgba(0, 16, 20, 1.0)",
          "fontSize": "22.0px",
          "fontWeight": 700,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "27.06px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "May 29 • 12:01 AM",
        "text": "May 29 • 12:01 AM",
        "style": {
          "left": "169.0px",
          "top": "579.5px",
          "width": "109.0px",
          "height": "10.0px",
          "color": "rgba(112, 115, 156, 1.0)",
          "fontSize": "13.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "21.0px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 12",
        "style": {
          "left": "143.0px",
          "top": "607.5px",
          "width": "88.0px",
          "height": "26.0px",
          "background": "rgba(113, 182, 245, 1.0)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "text",
        "name": "Get Ticket",
        "text": "Get Ticket",
        "style": {
          "left": "157.0px",
          "top": "616.0px",
          "width": "60.0px",
          "height": "9.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "14.76px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 1000003011",
        "style": {
          "left": "24.0px",
          "top": "661.0px",
          "width": "327.0px",
          "height": "121.0px",
          "background": "rgba(249, 249, 249, 1.0)",
          "borderRadius": "28.0px"
        }
      },
      {
        "kind": "shape",
        "name": "image",
        "style": {
          "left": "32.0px",
          "top": "669.0px",
          "width": "97.0px",
          "height": "105.0px",
          "backgroundImage": "url(/figma-assets-small/18-981dadd887.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat",
          "borderRadius": "24.0px"
        }
      },
      {
        "kind": "text",
        "name": "Kanda Matsuri(ラト)",
        "text": "Kanda Matsuri(ラト)",
        "style": {
          "left": "143.0px",
          "top": "679.0px",
          "width": "179.0px",
          "height": "15.0px",
          "color": "rgba(0, 16, 20, 1.0)",
          "fontSize": "22.0px",
          "fontWeight": 700,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "27.06px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "May 02 • 18:00 PM",
        "text": "May 02 • 18:00 PM",
        "style": {
          "left": "169.0px",
          "top": "710.0px",
          "width": "116.0px",
          "height": "10.0px",
          "color": "rgba(112, 115, 156, 1.0)",
          "fontSize": "13.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "21.0px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 12",
        "style": {
          "left": "143.0px",
          "top": "738.0px",
          "width": "88.0px",
          "height": "26.0px",
          "background": "rgba(113, 182, 245, 1.0)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "text",
        "name": "Get Ticket",
        "text": "Get Ticket",
        "style": {
          "left": "157.0px",
          "top": "746.5px",
          "width": "60.0px",
          "height": "9.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "14.76px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 1000003012",
        "style": {
          "left": "24.0px",
          "top": "792.0px",
          "width": "327.0px",
          "height": "121.0px",
          "background": "rgba(249, 249, 249, 1.0)",
          "borderRadius": "28.0px"
        }
      },
      {
        "kind": "shape",
        "name": "image",
        "style": {
          "left": "32.0px",
          "top": "800.0px",
          "width": "97.0px",
          "height": "105.0px",
          "backgroundImage": "url(/figma-assets-small/22-a10623f08c.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat",
          "borderRadius": "24.0px"
        }
      },
      {
        "kind": "text",
        "name": "Gion Matsuri (祇園祭)",
        "text": "Gion Matsuri (祇園祭)",
        "style": {
          "left": "143.0px",
          "top": "809.5px",
          "width": "183.0px",
          "height": "16.0px",
          "color": "rgba(0, 16, 20, 1.0)",
          "fontSize": "22.0px",
          "fontWeight": 700,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "27.06px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "May 28 • 10:00 AM",
        "text": "May 28 • 10:00 AM",
        "style": {
          "left": "169.0px",
          "top": "841.5px",
          "width": "116.0px",
          "height": "10.0px",
          "color": "rgba(112, 115, 156, 1.0)",
          "fontSize": "13.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "21.0px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 12",
        "style": {
          "left": "143.0px",
          "top": "869.5px",
          "width": "88.0px",
          "height": "26.0px",
          "background": "rgba(113, 182, 245, 1.0)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "text",
        "name": "Get Ticket",
        "text": "Get Ticket",
        "style": {
          "left": "157.0px",
          "top": "878.0px",
          "width": "60.0px",
          "height": "9.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "14.76px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 489",
        "style": {
          "left": "0.0px",
          "top": "719.0px",
          "width": "375.0px",
          "height": "93.0px",
          "background": "linear-gradient(135deg, rgba(212, 217, 222, 0.0) 41%, rgba(166, 185, 202, 1.0) 69%)"
        }
      },
      {
        "kind": "shape",
        "name": "image 42",
        "style": {
          "left": "113.0px",
          "top": "705.0px",
          "width": "142.0px",
          "height": "70.0px",
          "background": "rgba(255, 255, 255, 0.2)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "shape",
        "name": "image 43",
        "style": {
          "left": "113.01px",
          "top": "705.0px",
          "width": "141.97px",
          "height": "70.0px",
          "background": "rgba(232, 232, 232, 0.55)",
          "border": "1.0px solid rgba(255, 255, 255, 0.65)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "140.0px",
          "top": "730.0px",
          "width": "18.0px",
          "height": "20.0px",
          "border": "1.5px solid rgba(0, 0, 0, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "Bar",
        "style": {
          "left": "121.0px",
          "top": "799.0px",
          "width": "134.0px",
          "height": "5.0px",
          "background": "rgba(22, 23, 29, 1.0)",
          "borderRadius": "2.5px"
        }
      }
    ]
  },
  {
    "name": "9. Notifications & Alerts",
    "id": "4001:2267",
    "width": 375,
    "height": 812,
    "layers": [
      {
        "kind": "shape",
        "name": "Vector 1",
        "style": {
          "left": "-41.0px",
          "top": "-100.0px",
          "width": "513.0px",
          "height": "246.0px",
          "background": "linear-gradient(135deg, rgba(125, 175, 220, 1.0) 18%, rgba(252, 236, 206, 1.0) 41%, rgba(251, 227, 141, 1.0) 78%, rgba(253, 236, 183, 1.0) 100%)"
        }
      },
      {
        "kind": "shape",
        "name": "Vector 2",
        "style": {
          "left": "-82.36px",
          "top": "-90.2px",
          "width": "720.89px",
          "height": "361.61px",
          "background": "linear-gradient(135deg, rgba(155, 203, 247, 0.8) 18%, rgba(253, 236, 183, 0.24) 84%)"
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "236.32px",
          "top": "-104.06px",
          "width": "401.52px",
          "height": "399.13px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.09
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "206.42px",
          "top": "-203.33px",
          "width": "64.35px",
          "height": "454.08px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.07
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "-162.11px",
          "top": "-90.88px",
          "width": "398.63px",
          "height": "341.59px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.07
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "236.37px",
          "top": "-178.5px",
          "width": "236.02px",
          "height": "429.24px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.07
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "4.64px",
          "top": "-179.79px",
          "width": "231.84px",
          "height": "430.53px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.05
        }
      },
      {
        "kind": "text",
        "name": "Notification",
        "text": "Notification",
        "style": {
          "left": "130.0px",
          "top": "74.0px",
          "width": "115.0px",
          "height": "15.0px",
          "color": "rgba(0, 16, 20, 1.0)",
          "fontSize": "20.0px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "24.6px",
          "textAlign": "center"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 21",
        "style": {
          "left": "24.0px",
          "top": "57.0px",
          "width": "48.0px",
          "height": "48.0px",
          "background": "rgba(240, 243, 245, 0.5)",
          "borderRadius": "24.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 22",
        "style": {
          "left": "303.0px",
          "top": "57.0px",
          "width": "48.0px",
          "height": "48.0px",
          "background": "rgba(240, 243, 245, 0.6)",
          "borderRadius": "24.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "317.31px",
          "top": "71.01px",
          "width": "19.5px",
          "height": "20.0px",
          "border": "1.5px solid rgba(59, 62, 108, 1.0)",
          "borderRadius": "0.0px 0.0px 0.0px 0.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Border",
        "style": {
          "left": "314.33px",
          "top": "22.0px",
          "width": "22.0px",
          "height": "11.33px",
          "border": "1.0px solid rgba(0, 0, 0, 1.0)",
          "borderRadius": "2.67px",
          "opacity": 0.35
        }
      },
      {
        "kind": "shape",
        "name": "Capacity",
        "style": {
          "left": "316.33px",
          "top": "24.0px",
          "width": "18.0px",
          "height": "7.33px",
          "background": "rgba(0, 0, 0, 1.0)",
          "borderRadius": "1.33px"
        }
      },
      {
        "kind": "shape",
        "name": "Wifi",
        "style": {
          "left": "294.03px",
          "top": "22.0px",
          "width": "15.27px",
          "height": "10.97px",
          "background": "rgba(0, 0, 0, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "Cellular Connection",
        "style": {
          "left": "272.0px",
          "top": "22.34px",
          "width": "17.0px",
          "height": "10.67px",
          "background": "rgba(0, 0, 0, 1.0)"
        }
      },
      {
        "kind": "text",
        "name": "↳ Time",
        "text": "9:54",
        "style": {
          "left": "25.0px",
          "top": "22.0px",
          "width": "30.0px",
          "height": "10.0px",
          "color": "rgba(0, 0, 0, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 500,
          "fontFamily": "Satoshi Variable, Plus Jakarta Sans, sans-serif",
          "lineHeight": "18.0px",
          "textAlign": "center"
        }
      },
      {
        "kind": "text",
        "name": "Trip Reminders",
        "text": "Trip Reminders",
        "style": {
          "left": "24.0px",
          "top": "133.0px",
          "width": "129.0px",
          "height": "13.0px",
          "color": "rgba(18, 20, 23, 1.0)",
          "fontSize": "18.0px",
          "fontWeight": 700,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "28.0px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "AI Travel Tips",
        "text": "AI Travel Tips",
        "style": {
          "left": "24.0px",
          "top": "350.0px",
          "width": "112.0px",
          "height": "13.0px",
          "color": "rgba(18, 20, 23, 1.0)",
          "fontSize": "18.0px",
          "fontWeight": 700,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "28.0px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "Weather & Safety Alerts",
        "text": "Weather & Safety Alerts",
        "style": {
          "left": "24.0px",
          "top": "531.0px",
          "width": "209.0px",
          "height": "13.0px",
          "color": "rgba(18, 20, 23, 1.0)",
          "fontSize": "18.0px",
          "fontWeight": 700,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "28.0px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "Price Drop Alerts",
        "text": "Price Drop Alerts",
        "style": {
          "left": "24.0px",
          "top": "639.0px",
          "width": "148.0px",
          "height": "13.0px",
          "color": "rgba(18, 20, 23, 1.0)",
          "fontSize": "18.0px",
          "fontWeight": 700,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "28.0px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 490",
        "style": {
          "left": "0.0px",
          "top": "719.0px",
          "width": "375.0px",
          "height": "93.0px",
          "background": "linear-gradient(135deg, rgba(212, 217, 222, 0.0) 41%, rgba(166, 185, 202, 1.0) 69%)"
        }
      },
      {
        "kind": "shape",
        "name": "Bar",
        "style": {
          "left": "121.0px",
          "top": "799.0px",
          "width": "134.0px",
          "height": "5.0px",
          "background": "rgba(22, 23, 29, 1.0)",
          "borderRadius": "2.5px"
        }
      },
      {
        "kind": "shape",
        "name": "image 42",
        "style": {
          "left": "113.0px",
          "top": "705.0px",
          "width": "142.0px",
          "height": "70.0px",
          "background": "rgba(255, 255, 255, 0.2)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "shape",
        "name": "image 43",
        "style": {
          "left": "113.01px",
          "top": "705.0px",
          "width": "141.97px",
          "height": "70.0px",
          "background": "rgba(232, 232, 232, 0.55)",
          "border": "1.0px solid rgba(255, 255, 255, 0.65)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "140.0px",
          "top": "730.0px",
          "width": "18.0px",
          "height": "20.0px",
          "border": "1.5px solid rgba(0, 0, 0, 1.0)"
        }
      },
      {
        "kind": "text",
        "name": "12m",
        "text": "12m",
        "style": {
          "left": "328.0px",
          "top": "168.0px",
          "width": "23.0px",
          "height": "9.0px",
          "color": "rgba(112, 115, 156, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "16.2px",
          "textAlign": "right"
        }
      },
      {
        "kind": "shape",
        "name": "image",
        "style": {
          "left": "24.0px",
          "top": "166.0px",
          "width": "33.0px",
          "height": "33.0px",
          "background": "rgba(153, 212, 241, 0.6)",
          "borderRadius": "999px"
        }
      },
      {
        "kind": "text",
        "name": "Kyoto Zen (あなた) Hotel Check-in",
        "text": "Kyoto Zen (あなた) Hotel Check-in ",
        "style": {
          "left": "69.0px",
          "top": "169.0px",
          "width": "225.0px",
          "height": "10.0px",
          "color": "rgba(0, 16, 20, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 700,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "18.2px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "Check-in to your hotel in Osaka.",
        "text": "Check-in to your hotel in Osaka.",
        "style": {
          "left": "69.0px",
          "top": "188.0px",
          "width": "225.0px",
          "height": "9.0px",
          "color": "rgba(118, 118, 118, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 400,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "15.6px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "13h",
        "text": "13h",
        "style": {
          "left": "332.0px",
          "top": "385.0px",
          "width": "19.0px",
          "height": "9.0px",
          "color": "rgba(112, 115, 156, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "16.2px",
          "textAlign": "right"
        }
      },
      {
        "kind": "shape",
        "name": "image",
        "style": {
          "left": "24.0px",
          "top": "383.0px",
          "width": "33.0px",
          "height": "33.0px",
          "background": "rgba(153, 212, 241, 0.6)",
          "borderRadius": "999px"
        }
      },
      {
        "kind": "text",
        "name": "Explore Kyoto's Secret Gardens",
        "text": "Explore Kyoto's Secret Gardens",
        "style": {
          "left": "69.0px",
          "top": "386.0px",
          "width": "225.0px",
          "height": "10.0px",
          "color": "rgba(0, 16, 20, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "18.2px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "Discover hidden gems and local favorites.",
        "text": "Discover hidden gems and local favorites.",
        "style": {
          "left": "69.0px",
          "top": "405.0px",
          "width": "192.0px",
          "height": "25.0px",
          "color": "rgba(118, 118, 118, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 400,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "15.6px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "2d",
        "text": "2d",
        "style": {
          "left": "335.0px",
          "top": "566.0px",
          "width": "16.0px",
          "height": "9.0px",
          "color": "rgba(112, 115, 156, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "16.2px",
          "textAlign": "right"
        }
      },
      {
        "kind": "shape",
        "name": "image",
        "style": {
          "left": "24.0px",
          "top": "564.0px",
          "width": "33.0px",
          "height": "33.0px",
          "background": "rgba(251, 227, 141, 1.0)",
          "borderRadius": "999px"
        }
      },
      {
        "kind": "shape",
        "name": "Ellipse 1480",
        "style": {
          "left": "43.33px",
          "top": "575.54px",
          "width": "2.12px",
          "height": "2.12px",
          "border": "1.2px solid rgba(59, 62, 108, 1.0)",
          "borderRadius": "999px"
        }
      },
      {
        "kind": "text",
        "name": "Okinawa Typhoon Alert",
        "text": "Okinawa Typhoon Alert",
        "style": {
          "left": "69.0px",
          "top": "567.0px",
          "width": "225.0px",
          "height": "10.0px",
          "color": "rgba(0, 16, 20, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "18.2px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "Typhoon warning for Okinawa. Stay indoors.",
        "text": "Typhoon warning for Okinawa. Stay indoors.",
        "style": {
          "left": "69.0px",
          "top": "586.0px",
          "width": "202.0px",
          "height": "25.0px",
          "color": "rgba(118, 118, 118, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 400,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "15.6px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "5d",
        "text": "5d",
        "style": {
          "left": "335.0px",
          "top": "674.0px",
          "width": "16.0px",
          "height": "9.0px",
          "color": "rgba(112, 115, 156, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "16.2px",
          "textAlign": "right"
        }
      },
      {
        "kind": "shape",
        "name": "image",
        "style": {
          "left": "24.0px",
          "top": "672.0px",
          "width": "33.0px",
          "height": "33.0px",
          "background": "rgba(153, 212, 241, 0.6)",
          "borderRadius": "999px"
        }
      },
      {
        "kind": "text",
        "name": "Sapporo Flight Prices",
        "text": "Sapporo Flight Prices",
        "style": {
          "left": "69.0px",
          "top": "675.0px",
          "width": "225.0px",
          "height": "10.0px",
          "color": "rgba(0, 16, 20, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "18.2px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "Flights to Sapporo have decreased by 15%.",
        "text": "Flights to Sapporo have decreased by 15%.",
        "style": {
          "left": "69.0px",
          "top": "694.0px",
          "width": "202.0px",
          "height": "25.0px",
          "color": "rgba(118, 118, 118, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 400,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "15.6px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "15h",
        "text": "15h",
        "style": {
          "left": "332.0px",
          "top": "456.0px",
          "width": "19.0px",
          "height": "9.0px",
          "color": "rgba(112, 115, 156, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "16.2px",
          "textAlign": "right"
        }
      },
      {
        "kind": "shape",
        "name": "image",
        "style": {
          "left": "24.0px",
          "top": "454.0px",
          "width": "33.0px",
          "height": "33.0px",
          "background": "rgba(153, 212, 241, 0.6)",
          "borderRadius": "999px"
        }
      },
      {
        "kind": "text",
        "name": "Golden Hour in Kyoto is at 5:42 PM today",
        "text": "Golden Hour in Kyoto is at 5:42 PM today",
        "style": {
          "left": "69.0px",
          "top": "457.0px",
          "width": "225.0px",
          "height": "28.0px",
          "color": "rgba(0, 16, 20, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "18.2px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "Head to Arashiyama Bamboo..",
        "text": "Head to Arashiyama Bamboo..",
        "style": {
          "left": "69.0px",
          "top": "494.0px",
          "width": "192.0px",
          "height": "9.0px",
          "color": "rgba(118, 118, 118, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 400,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "15.6px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 1000002975",
        "style": {
          "left": "66.0px",
          "top": "264.0px",
          "width": "285.0px",
          "height": "58.0px",
          "background": "rgba(249, 249, 249, 1.0)",
          "borderRadius": "18.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 2173",
        "style": {
          "left": "71.0px",
          "top": "269.0px",
          "width": "48.0px",
          "height": "48.0px",
          "backgroundImage": "url(/figma-assets-small/34-d6bfa8a0f5.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat",
          "borderRadius": "13.0px"
        }
      },
      {
        "kind": "text",
        "name": "Mount Daisen(いせ)",
        "text": "Mount Daisen(いせ)",
        "style": {
          "left": "127.0px",
          "top": "279.0px",
          "width": "130.0px",
          "height": "10.0px",
          "color": "rgba(0, 16, 20, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "18.9px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "May 14-17",
        "text": "May 14-17",
        "style": {
          "left": "127.0px",
          "top": "299.0px",
          "width": "112.0px",
          "height": "8.0px",
          "color": "rgba(112, 115, 156, 1.0)",
          "fontSize": "11.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "14.85px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 1000002976",
        "style": {
          "left": "66.0px",
          "top": "264.0px",
          "width": "285.0px",
          "height": "58.0px",
          "background": "rgba(249, 249, 249, 1.0)",
          "borderRadius": "18.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 2173",
        "style": {
          "left": "71.0px",
          "top": "269.0px",
          "width": "48.0px",
          "height": "48.0px",
          "backgroundImage": "url(/figma-assets-small/34-d6bfa8a0f5.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat",
          "borderRadius": "13.0px"
        }
      },
      {
        "kind": "text",
        "name": "Mount Daisen(いせ)",
        "text": "Mount Daisen(いせ)",
        "style": {
          "left": "127.0px",
          "top": "279.0px",
          "width": "130.0px",
          "height": "10.0px",
          "color": "rgba(0, 16, 20, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "18.9px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "May 14-17",
        "text": "May 14-17",
        "style": {
          "left": "127.0px",
          "top": "299.0px",
          "width": "112.0px",
          "height": "8.0px",
          "color": "rgba(112, 115, 156, 1.0)",
          "fontSize": "11.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "14.85px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "Jhon Snow, you created a travel plan for the coming week..",
        "text": "Jhon Snow, you created a travel\nplan for the coming week..",
        "style": {
          "left": "67.0px",
          "top": "226.0px",
          "width": "208.0px",
          "height": "28.0px",
          "color": "rgba(0, 16, 20, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "18.2px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "37m",
        "text": "37m",
        "style": {
          "left": "326.0px",
          "top": "225.0px",
          "width": "25.0px",
          "height": "9.0px",
          "color": "rgba(112, 115, 156, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "16.2px",
          "textAlign": "right"
        }
      },
      {
        "kind": "shape",
        "name": "Ellipse 7",
        "style": {
          "left": "24.0px",
          "top": "223.0px",
          "width": "33.0px",
          "height": "33.0px",
          "backgroundImage": "url(/figma-assets-small/04-2facbdbb22.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat",
          "borderRadius": "999px"
        }
      },
      {
        "kind": "shape",
        "name": "Ellipse 8",
        "style": {
          "left": "49.0px",
          "top": "246.0px",
          "width": "8.0px",
          "height": "8.0px",
          "background": "rgba(248, 186, 12, 1.0)",
          "border": "1.0px solid rgba(215, 229, 229, 1.0)",
          "borderRadius": "999px"
        }
      }
    ]
  },
  {
    "name": "Home",
    "id": "4001:2399",
    "width": 375,
    "height": 812,
    "layers": [
      {
        "kind": "shape",
        "name": "Bar",
        "style": {
          "left": "121.0px",
          "top": "799.0px",
          "width": "134.0px",
          "height": "5.0px",
          "background": "rgba(22, 23, 29, 1.0)",
          "borderRadius": "2.5px"
        }
      },
      {
        "kind": "shape",
        "name": "Vector 1",
        "style": {
          "left": "-66.0px",
          "top": "-100.0px",
          "width": "563.0px",
          "height": "269.5px",
          "background": "linear-gradient(135deg, rgba(125, 175, 220, 1.0) 18%, rgba(252, 236, 206, 1.0) 41%, rgba(251, 227, 141, 1.0) 78%, rgba(253, 236, 183, 1.0) 100%)"
        }
      },
      {
        "kind": "shape",
        "name": "Vector 2",
        "style": {
          "left": "-55.0px",
          "top": "-103.0px",
          "width": "563.0px",
          "height": "269.5px",
          "background": "linear-gradient(135deg, rgba(155, 203, 247, 1.0) 18%, rgba(252, 236, 206, 1.0) 41%, rgba(251, 227, 141, 1.0) 78%, rgba(253, 236, 183, 1.0) 100%)"
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "206.42px",
          "top": "-364.0px",
          "width": "64.35px",
          "height": "533.74px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.09
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "236.32px",
          "top": "-228.94px",
          "width": "401.52px",
          "height": "398.63px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.09
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "-162.11px",
          "top": "-231.82px",
          "width": "398.63px",
          "height": "401.52px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.09
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "236.37px",
          "top": "-334.82px",
          "width": "236.02px",
          "height": "504.55px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.09
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "-268.0px",
          "top": "-66.38px",
          "width": "504.56px",
          "height": "236.03px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.09
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "4.64px",
          "top": "-336.33px",
          "width": "231.84px",
          "height": "506.06px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.06
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "179.0px",
          "top": "96.0px",
          "width": "95.0px",
          "height": "96.0px",
          "background": "rgba(255, 221, 21, 1.0)",
          "opacity": 0.15
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "187.0px",
          "top": "105.0px",
          "width": "79.0px",
          "height": "79.0px",
          "background": "rgba(249, 195, 0, 1.0)",
          "opacity": 0.14
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "-244.0px",
          "top": "75.0px",
          "width": "750.49px",
          "height": "314.53px",
          "background": "rgba(255, 255, 255, 1.0)",
          "opacity": 0.27
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "237.0px",
          "top": "46.0px",
          "width": "71.0px",
          "height": "35.0px",
          "background": "rgba(255, 254, 248, 1.0)",
          "opacity": 0.32
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "66.0px",
          "top": "26.0px",
          "width": "57.61px",
          "height": "25.93px",
          "background": "rgba(209, 232, 252, 1.0)",
          "opacity": 0.7
        }
      },
      {
        "kind": "shape",
        "name": "Border",
        "style": {
          "left": "314.33px",
          "top": "22.0px",
          "width": "22.0px",
          "height": "11.33px",
          "border": "1.0px solid rgba(0, 0, 0, 1.0)",
          "borderRadius": "2.67px",
          "opacity": 0.35
        }
      },
      {
        "kind": "shape",
        "name": "Capacity",
        "style": {
          "left": "316.33px",
          "top": "24.0px",
          "width": "18.0px",
          "height": "7.33px",
          "background": "rgba(0, 0, 0, 1.0)",
          "borderRadius": "1.33px"
        }
      },
      {
        "kind": "shape",
        "name": "Wifi",
        "style": {
          "left": "294.03px",
          "top": "22.0px",
          "width": "15.27px",
          "height": "10.97px",
          "background": "rgba(0, 0, 0, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "Cellular Connection",
        "style": {
          "left": "272.0px",
          "top": "22.34px",
          "width": "17.0px",
          "height": "10.67px",
          "background": "rgba(0, 0, 0, 1.0)"
        }
      },
      {
        "kind": "text",
        "name": "↳ Time",
        "text": "9:54",
        "style": {
          "left": "25.0px",
          "top": "22.0px",
          "width": "30.0px",
          "height": "10.0px",
          "color": "rgba(0, 0, 0, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 500,
          "fontFamily": "Satoshi Variable, Plus Jakarta Sans, sans-serif",
          "lineHeight": "18.0px",
          "textAlign": "center"
        }
      },
      {
        "kind": "text",
        "name": "Ready to Explore Tokyo!",
        "text": "Ready to Explore \nTokyo!",
        "style": {
          "left": "74.0px",
          "top": "98.0px",
          "width": "226.0px",
          "height": "65.0px",
          "color": "rgba(0, 16, 20, 1.0)",
          "fontSize": "17.0px",
          "fontWeight": 400,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "20.91px",
          "textAlign": "center"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 4",
        "style": {
          "left": "24.0px",
          "top": "203.0px",
          "width": "271.0px",
          "height": "48.0px",
          "border": "1.0px solid rgba(236, 235, 235, 1.0)",
          "borderRadius": "24.0px"
        }
      },
      {
        "kind": "text",
        "name": "Find places, food, Trips..",
        "text": "Find places, food, Trips..",
        "style": {
          "left": "72.0px",
          "top": "222.0px",
          "width": "160.0px",
          "height": "10.0px",
          "color": "rgba(112, 115, 156, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 400,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "17.22px",
          "textAlign": "center"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 2",
        "style": {
          "left": "303.0px",
          "top": "203.0px",
          "width": "48.0px",
          "height": "48.0px",
          "border": "1.0px solid rgba(236, 235, 235, 1.0)",
          "borderRadius": "24.0px"
        }
      },
      {
        "kind": "text",
        "name": "AI Insights Today",
        "text": "AI Insights Today",
        "style": {
          "left": "24.0px",
          "top": "283.0px",
          "width": "147.0px",
          "height": "13.0px",
          "color": "rgba(18, 20, 23, 1.0)",
          "fontSize": "18.0px",
          "fontWeight": 700,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "20.16px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "https://dribbble.com/shots/14262157-Orix-Food-App",
        "style": {
          "left": "24.0px",
          "top": "312.0px",
          "width": "117.0px",
          "height": "136.0px",
          "background": "rgba(245, 250, 255, 1.0)",
          "borderRadius": "28.0px"
        }
      },
      {
        "kind": "text",
        "name": "Tranding Destination",
        "text": "Tranding\nDestination",
        "style": {
          "left": "49.0px",
          "top": "406.0px",
          "width": "67.0px",
          "height": "24.0px",
          "color": "rgba(18, 20, 23, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "15.0px",
          "textAlign": "center"
        }
      },
      {
        "kind": "shape",
        "name": "image 35",
        "style": {
          "left": "52.0px",
          "top": "326.0px",
          "width": "62.81px",
          "height": "66.0px",
          "backgroundImage": "url(/figma-assets-small/03-16ce7c0d13.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat"
        }
      },
      {
        "kind": "shape",
        "name": "https://dribbble.com/shots/14262157-Orix-Food-App",
        "style": {
          "left": "149.0px",
          "top": "312.0px",
          "width": "117.0px",
          "height": "136.0px",
          "background": "rgba(245, 250, 255, 1.0)",
          "borderRadius": "28.0px"
        }
      },
      {
        "kind": "text",
        "name": "Weather Friendly",
        "text": "Weather\nFriendly",
        "style": {
          "left": "182.0px",
          "top": "406.0px",
          "width": "50.0px",
          "height": "24.0px",
          "color": "rgba(18, 20, 23, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "15.0px",
          "textAlign": "center"
        }
      },
      {
        "kind": "shape",
        "name": "image 31",
        "style": {
          "left": "173.0px",
          "top": "326.0px",
          "width": "69.25px",
          "height": "66.0px",
          "backgroundImage": "url(/figma-assets-small/15-8760ee7934.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat"
        }
      },
      {
        "kind": "shape",
        "name": "https://dribbble.com/shots/14262157-Orix-Food-App",
        "style": {
          "left": "274.0px",
          "top": "312.0px",
          "width": "117.0px",
          "height": "136.0px",
          "background": "rgba(245, 250, 255, 1.0)",
          "borderRadius": "28.0px"
        }
      },
      {
        "kind": "text",
        "name": "Hidden Gem Place",
        "text": "Hidden Gem\nPlace",
        "style": {
          "left": "296.0px",
          "top": "406.0px",
          "width": "73.0px",
          "height": "24.0px",
          "color": "rgba(18, 20, 23, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "15.0px",
          "textAlign": "center"
        }
      },
      {
        "kind": "shape",
        "name": "image 37",
        "style": {
          "left": "302.0px",
          "top": "326.0px",
          "width": "60.68px",
          "height": "66.0px",
          "backgroundImage": "url(/figma-assets-small/05-301fc710c2.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat"
        }
      },
      {
        "kind": "text",
        "name": "Locals by AI",
        "text": "Locals by AI",
        "style": {
          "left": "24.0px",
          "top": "476.0px",
          "width": "390.0px",
          "height": "13.0px",
          "color": "rgba(18, 20, 23, 1.0)",
          "fontSize": "18.0px",
          "fontWeight": 700,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "20.16px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "image",
        "style": {
          "left": "24.0px",
          "top": "507.0px",
          "width": "189.0px",
          "height": "276.0px",
          "backgroundImage": "url(/figma-assets-small/19-9cc5e3d432.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat",
          "borderRadius": "31.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Shado",
        "style": {
          "left": "24.0px",
          "top": "507.0px",
          "width": "189.0px",
          "height": "276.0px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 0.0) 0%, rgba(207, 232, 253, 1.0) 100%)",
          "borderRadius": "31.0px"
        }
      },
      {
        "kind": "text",
        "name": "Mount Fuji",
        "text": "Mount Fuji",
        "style": {
          "left": "48.0px",
          "top": "538.0px",
          "width": "126.0px",
          "height": "13.0px",
          "color": "rgba(18, 20, 23, 1.0)",
          "fontSize": "18.0px",
          "fontWeight": 700,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "20.16px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "富士信仰 (Fuji faith)",
        "text": "富士信仰  (Fuji faith)",
        "style": {
          "left": "48.0px",
          "top": "565.0px",
          "width": "126.0px",
          "height": "10.0px",
          "color": "rgba(7, 85, 131, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "15.68px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "image",
        "style": {
          "left": "225.0px",
          "top": "507.0px",
          "width": "189.0px",
          "height": "276.0px",
          "backgroundImage": "url(/figma-assets-small/37-de3b88f9a7.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat",
          "borderRadius": "31.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Shado",
        "style": {
          "left": "225.0px",
          "top": "507.0px",
          "width": "189.0px",
          "height": "276.0px",
          "background": "linear-gradient(135deg, rgba(252, 225, 132, 0.0) 0%, rgba(250, 214, 88, 1.0) 100%)",
          "borderRadius": "31.0px"
        }
      },
      {
        "kind": "text",
        "name": "Kiyomizu de",
        "text": "Kiyomizu de",
        "style": {
          "left": "249.0px",
          "top": "538.0px",
          "width": "141.0px",
          "height": "13.0px",
          "color": "rgba(18, 20, 23, 1.0)",
          "fontSize": "18.0px",
          "fontWeight": 700,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "20.16px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "清水寺 (Water Temple",
        "text": "清水寺 (Water Temple",
        "style": {
          "left": "249.0px",
          "top": "565.0px",
          "width": "141.0px",
          "height": "10.0px",
          "color": "rgba(188, 82, 8, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "15.68px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "image 42",
        "style": {
          "left": "113.0px",
          "top": "705.0px",
          "width": "142.0px",
          "height": "70.0px",
          "background": "rgba(255, 255, 255, 0.2)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "shape",
        "name": "image 43",
        "style": {
          "left": "113.01px",
          "top": "705.0px",
          "width": "141.97px",
          "height": "70.0px",
          "background": "rgba(255, 255, 255, 0.55)",
          "border": "1.0px solid rgba(255, 255, 255, 0.65)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 7",
        "style": {
          "left": "115.0px",
          "top": "707.0px",
          "width": "68.96px",
          "height": "66.0px",
          "backgroundImage": "url(/figma-assets-small/33-d53b8a84e2.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat",
          "borderRadius": "25.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "140.0px",
          "top": "730.0px",
          "width": "18.0px",
          "height": "20.0px",
          "border": "1.5px solid rgba(255, 255, 255, 1.0)"
        }
      }
    ]
  },
  {
    "name": "Explore new VIbes",
    "id": "4001:2484",
    "width": 375,
    "height": 812,
    "layers": [
      {
        "kind": "shape",
        "name": "Bar",
        "style": {
          "left": "121.0px",
          "top": "799.0px",
          "width": "134.0px",
          "height": "5.0px",
          "background": "rgba(22, 23, 29, 1.0)",
          "borderRadius": "2.5px"
        }
      },
      {
        "kind": "shape",
        "name": "Vector 1",
        "style": {
          "left": "-66.0px",
          "top": "-100.0px",
          "width": "563.0px",
          "height": "269.5px",
          "background": "linear-gradient(135deg, rgba(125, 175, 220, 1.0) 18%, rgba(252, 236, 206, 1.0) 41%, rgba(251, 227, 141, 1.0) 78%, rgba(253, 236, 183, 1.0) 100%)"
        }
      },
      {
        "kind": "shape",
        "name": "Vector 2",
        "style": {
          "left": "-55.0px",
          "top": "-103.0px",
          "width": "699.0px",
          "height": "318.0px",
          "background": "linear-gradient(135deg, rgba(155, 203, 247, 0.8) 18%, rgba(253, 236, 183, 0.8) 100%)"
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "206.42px",
          "top": "-239.0px",
          "width": "64.35px",
          "height": "533.74px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.09
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "236.32px",
          "top": "-103.94px",
          "width": "401.52px",
          "height": "398.63px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.09
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "-162.11px",
          "top": "-106.82px",
          "width": "398.63px",
          "height": "401.52px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.09
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "236.37px",
          "top": "-209.82px",
          "width": "236.02px",
          "height": "504.55px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.09
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "-268.0px",
          "top": "58.62px",
          "width": "504.56px",
          "height": "236.03px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.09
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "4.64px",
          "top": "-211.33px",
          "width": "231.84px",
          "height": "506.06px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.06
        }
      },
      {
        "kind": "shape",
        "name": "Border",
        "style": {
          "left": "314.33px",
          "top": "22.0px",
          "width": "22.0px",
          "height": "11.33px",
          "border": "1.0px solid rgba(0, 0, 0, 1.0)",
          "borderRadius": "2.67px",
          "opacity": 0.35
        }
      },
      {
        "kind": "shape",
        "name": "Capacity",
        "style": {
          "left": "316.33px",
          "top": "24.0px",
          "width": "18.0px",
          "height": "7.33px",
          "background": "rgba(0, 0, 0, 1.0)",
          "borderRadius": "1.33px"
        }
      },
      {
        "kind": "shape",
        "name": "Wifi",
        "style": {
          "left": "294.03px",
          "top": "22.0px",
          "width": "15.27px",
          "height": "10.97px",
          "background": "rgba(0, 0, 0, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "Cellular Connection",
        "style": {
          "left": "272.0px",
          "top": "22.34px",
          "width": "17.0px",
          "height": "10.67px",
          "background": "rgba(0, 0, 0, 1.0)"
        }
      },
      {
        "kind": "text",
        "name": "↳ Time",
        "text": "9:54",
        "style": {
          "left": "25.0px",
          "top": "22.0px",
          "width": "30.0px",
          "height": "10.0px",
          "color": "rgba(0, 0, 0, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 500,
          "fontFamily": "Satoshi Variable, Plus Jakarta Sans, sans-serif",
          "lineHeight": "18.0px",
          "textAlign": "center"
        }
      },
      {
        "kind": "shape",
        "name": "Bar",
        "style": {
          "left": "121.0px",
          "top": "799.0px",
          "width": "134.0px",
          "height": "5.0px",
          "background": "rgba(22, 23, 29, 1.0)",
          "borderRadius": "2.5px"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 12",
        "style": {
          "left": "24.0px",
          "top": "125.0px",
          "width": "96.0px",
          "height": "34.0px",
          "background": "rgba(248, 186, 12, 1.0)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "text",
        "name": "Must-See",
        "text": "Must-See ",
        "style": {
          "left": "38.0px",
          "top": "137.0px",
          "width": "68.0px",
          "height": "10.0px",
          "color": "rgba(18, 20, 23, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "17.22px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 16",
        "style": {
          "left": "126.0px",
          "top": "125.0px",
          "width": "113.0px",
          "height": "34.0px",
          "background": "rgba(255, 255, 255, 1.0)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "text",
        "name": "Hidden Gem",
        "text": "Hidden Gem",
        "style": {
          "left": "140.0px",
          "top": "137.0px",
          "width": "85.0px",
          "height": "10.0px",
          "color": "rgba(18, 20, 23, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "17.22px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 15",
        "style": {
          "left": "245.0px",
          "top": "125.0px",
          "width": "112.0px",
          "height": "34.0px",
          "background": "rgba(255, 255, 255, 1.0)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "text",
        "name": "Food & Cafe",
        "text": "Food & Cafe",
        "style": {
          "left": "259.0px",
          "top": "137.0px",
          "width": "84.0px",
          "height": "10.0px",
          "color": "rgba(18, 20, 23, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "17.22px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 17",
        "style": {
          "left": "363.0px",
          "top": "125.0px",
          "width": "113.0px",
          "height": "34.0px",
          "background": "rgba(255, 255, 255, 1.0)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "text",
        "name": "Hotel",
        "text": "Hidden Gem",
        "style": {
          "left": "377.0px",
          "top": "137.0px",
          "width": "85.0px",
          "height": "10.0px",
          "color": "rgba(18, 20, 23, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "17.22px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 4",
        "style": {
          "left": "24.5px",
          "top": "57.0px",
          "width": "271.0px",
          "height": "48.0px",
          "background": "rgba(255, 255, 255, 0.34)",
          "border": "1.0px solid rgba(255, 255, 255, 0.75)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "text",
        "name": "Search by vibe, place, tag..",
        "text": "Search  by vibe, place, tag..",
        "style": {
          "left": "72.5px",
          "top": "76.0px",
          "width": "180.0px",
          "height": "10.0px",
          "color": "rgba(112, 115, 156, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 400,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "17.22px",
          "textAlign": "center"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 2",
        "style": {
          "left": "303.5px",
          "top": "57.0px",
          "width": "48.0px",
          "height": "48.0px",
          "background": "rgba(255, 255, 255, 0.34)",
          "border": "1.0px solid rgba(255, 255, 255, 0.65)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Rec",
        "style": {
          "left": "24.0px",
          "top": "183.0px",
          "width": "327.0px",
          "height": "189.0px",
          "backgroundImage": "url(/figma-assets-small/30-c6fae687e6.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat",
          "borderRadius": "31.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Rec",
        "style": {
          "left": "24.0px",
          "top": "183.0px",
          "width": "327.0px",
          "height": "189.0px",
          "background": "linear-gradient(135deg, rgba(157, 204, 245, 0.13) 51%, rgba(17, 97, 170, 1.0) 92%)",
          "borderRadius": "31.0px"
        }
      },
      {
        "kind": "shape",
        "name": "image",
        "style": {
          "left": "24.0px",
          "top": "293.0px",
          "width": "327.0px",
          "height": "79.0px",
          "background": "linear-gradient(135deg, rgba(230, 242, 254, 0.0) 35%, rgba(0, 32, 64, 0.5) 91%)",
          "borderRadius": "0.0px 0.0px 31.0px 31.0px"
        }
      },
      {
        "kind": "text",
        "name": "Find me base camp nue of Mount Takao",
        "text": "Find me base camp nue of\nMount Takao",
        "style": {
          "left": "74.0px",
          "top": "315.0px",
          "width": "226.0px",
          "height": "37.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "18.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "24.3px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Union",
        "style": {
          "left": "149.0px",
          "top": "190.0px",
          "width": "66.0px",
          "height": "97.0px",
          "background": "rgba(154, 212, 246, 0.4)"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 490",
        "style": {
          "left": "149.0px",
          "top": "190.0px",
          "width": "66.0px",
          "height": "35.0px",
          "background": "rgba(244, 246, 237, 1.0)",
          "borderRadius": "16.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Union",
        "style": {
          "left": "164.0px",
          "top": "214.0px",
          "width": "36.0px",
          "height": "73.0px",
          "background": "rgba(244, 246, 237, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "Ellipse 1",
        "style": {
          "left": "164.0px",
          "top": "251.0px",
          "width": "36.0px",
          "height": "36.0px",
          "background": "rgba(244, 246, 237, 1.0)",
          "borderRadius": "999px"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 491",
        "style": {
          "left": "181.0px",
          "top": "214.0px",
          "width": "2.0px",
          "height": "45.0px",
          "background": "rgba(244, 246, 237, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "Union",
        "style": {
          "left": "149.0px",
          "top": "190.0px",
          "width": "66.0px",
          "height": "97.0px",
          "background": "rgba(255, 255, 255, 0.8)"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 490",
        "style": {
          "left": "149.0px",
          "top": "190.0px",
          "width": "66.0px",
          "height": "35.0px",
          "background": "rgba(244, 246, 237, 1.0)",
          "borderRadius": "16.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Union",
        "style": {
          "left": "164.0px",
          "top": "216.0px",
          "width": "36.0px",
          "height": "71.0px",
          "background": "rgba(244, 246, 237, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "Ellipse 1",
        "style": {
          "left": "164.0px",
          "top": "251.0px",
          "width": "36.0px",
          "height": "36.0px",
          "background": "rgba(255, 255, 255, 1.0)",
          "borderRadius": "999px"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 491",
        "style": {
          "left": "181.0px",
          "top": "216.0px",
          "width": "2.0px",
          "height": "45.0px",
          "background": "rgba(244, 246, 237, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "image",
        "style": {
          "left": "168.0px",
          "top": "255.0px",
          "width": "28.0px",
          "height": "28.0px",
          "backgroundImage": "url(/figma-assets-small/17-97d2acbad6.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat",
          "borderRadius": "999px"
        }
      },
      {
        "kind": "text",
        "name": "Base Camp",
        "text": "Base \nCamp",
        "style": {
          "left": "167.0px",
          "top": "198.0px",
          "width": "30.0px",
          "height": "19.0px",
          "color": "rgba(12, 119, 174, 1.0)",
          "fontSize": "10.0px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "12.0px",
          "textAlign": "center"
        }
      },
      {
        "kind": "text",
        "name": "Must-See Today",
        "text": "Must-See Today",
        "style": {
          "left": "24.0px",
          "top": "400.0px",
          "width": "177.0px",
          "height": "13.0px",
          "color": "rgba(18, 20, 23, 1.0)",
          "fontSize": "18.0px",
          "fontWeight": 700,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "28.0px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "AI Curated Route",
        "text": "AI Curated Route",
        "style": {
          "left": "24.0px",
          "top": "429.0px",
          "width": "177.0px",
          "height": "9.0px",
          "color": "rgba(18, 20, 23, 1.0)",
          "fontSize": "12.0px",
          "fontWeight": 400,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "21.0px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "See All",
        "text": "See All",
        "style": {
          "left": "299.0px",
          "top": "400.0px",
          "width": "52.0px",
          "height": "12.0px",
          "color": "rgba(18, 72, 127, 1.0)",
          "fontSize": "16.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "21.0px",
          "textAlign": "right"
        }
      },
      {
        "kind": "shape",
        "name": "image",
        "style": {
          "left": "24.0px",
          "top": "454.0px",
          "width": "159.0px",
          "height": "205.0px",
          "backgroundImage": "url(/figma-assets-small/10-699ee4fd5a.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat",
          "borderRadius": "27.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Shado",
        "style": {
          "left": "24.0px",
          "top": "454.0px",
          "width": "159.0px",
          "height": "205.0px",
          "background": "linear-gradient(135deg, rgba(206, 156, 162, 0.05) 39%, rgba(23, 21, 9, 1.0) 73%)",
          "borderRadius": "27.0px"
        }
      },
      {
        "kind": "text",
        "name": "Torii Gate",
        "text": "Torii Gate",
        "style": {
          "left": "44.0px",
          "top": "606.0px",
          "width": "112.0px",
          "height": "8.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "11.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "14.85px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "Cherry Blossoms",
        "text": "Cherry Blossoms",
        "style": {
          "left": "44.0px",
          "top": "624.0px",
          "width": "115.0px",
          "height": "10.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "18.9px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 21",
        "style": {
          "left": "129.0px",
          "top": "460.0px",
          "width": "48.0px",
          "height": "48.0px",
          "background": "rgba(92, 75, 75, 0.34)",
          "borderRadius": "24.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "143.83px",
          "top": "475.75px",
          "width": "18.33px",
          "height": "16.5px",
          "border": "1.5px solid rgba(255, 255, 255, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "image",
        "style": {
          "left": "192.0px",
          "top": "454.0px",
          "width": "159.0px",
          "height": "205.0px",
          "backgroundImage": "url(/figma-assets-small/11-6d166205e9.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat",
          "borderRadius": "27.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Shado",
        "style": {
          "left": "192.0px",
          "top": "454.0px",
          "width": "159.0px",
          "height": "205.0px",
          "background": "linear-gradient(135deg, rgba(143, 206, 236, 0.1) 42%, rgba(23, 21, 9, 1.0) 74%)",
          "borderRadius": "27.0px"
        }
      },
      {
        "kind": "text",
        "name": "Shizuoka Regoin",
        "text": "Shizuoka Regoin",
        "style": {
          "left": "212.0px",
          "top": "606.0px",
          "width": "112.0px",
          "height": "8.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "11.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "14.85px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "Mount Fuji",
        "text": "Mount Fuji",
        "style": {
          "left": "212.0px",
          "top": "624.0px",
          "width": "112.0px",
          "height": "10.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "18.9px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 21",
        "style": {
          "left": "297.0px",
          "top": "460.0px",
          "width": "48.0px",
          "height": "48.0px",
          "background": "rgba(92, 75, 75, 0.29)",
          "borderRadius": "24.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "311.83px",
          "top": "475.75px",
          "width": "18.33px",
          "height": "16.5px",
          "border": "1.5px solid rgba(255, 255, 255, 1.0)"
        }
      },
      {
        "kind": "text",
        "name": "Hidden Gems Nearby",
        "text": "Hidden Gems Nearby",
        "style": {
          "left": "24.0px",
          "top": "687.0px",
          "width": "186.0px",
          "height": "13.0px",
          "color": "rgba(18, 20, 23, 1.0)",
          "fontSize": "18.0px",
          "fontWeight": 700,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "28.0px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "See All",
        "text": "See All",
        "style": {
          "left": "299.0px",
          "top": "687.5px",
          "width": "52.0px",
          "height": "12.0px",
          "color": "rgba(18, 72, 127, 1.0)",
          "fontSize": "16.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "21.0px",
          "textAlign": "right"
        }
      },
      {
        "kind": "shape",
        "name": "image",
        "style": {
          "left": "24.0px",
          "top": "716.0px",
          "width": "159.0px",
          "height": "205.0px",
          "backgroundImage": "url(/figma-assets-small/36-ddbbdc7667.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat",
          "borderRadius": "27.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Shado",
        "style": {
          "left": "24.0px",
          "top": "716.0px",
          "width": "159.0px",
          "height": "205.0px",
          "background": "linear-gradient(135deg, rgba(254, 243, 189, 0.0) 28%, rgba(23, 21, 9, 1.0) 77%, rgba(23, 21, 9, 1.0) 82%)",
          "borderRadius": "27.0px"
        }
      },
      {
        "kind": "text",
        "name": "Kansai Region",
        "text": "Kansai Region",
        "style": {
          "left": "44.0px",
          "top": "868.0px",
          "width": "112.0px",
          "height": "8.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "11.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "14.85px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "Summit Senority",
        "text": "Summit Senority",
        "style": {
          "left": "44.0px",
          "top": "886.0px",
          "width": "112.0px",
          "height": "10.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "18.9px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 21",
        "style": {
          "left": "129.0px",
          "top": "722.0px",
          "width": "48.0px",
          "height": "48.0px",
          "background": "rgba(92, 75, 75, 0.29)",
          "borderRadius": "24.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "143.83px",
          "top": "737.75px",
          "width": "18.33px",
          "height": "16.5px",
          "border": "1.5px solid rgba(255, 255, 255, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "image",
        "style": {
          "left": "192.0px",
          "top": "716.0px",
          "width": "159.0px",
          "height": "205.0px",
          "backgroundImage": "url(/figma-assets-small/06-317dbffc4e.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat",
          "borderRadius": "27.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Shado",
        "style": {
          "left": "192.0px",
          "top": "716.0px",
          "width": "159.0px",
          "height": "205.0px",
          "background": "linear-gradient(135deg, rgba(254, 243, 189, 0.0) 28%, rgba(23, 21, 9, 1.0) 77%, rgba(23, 21, 9, 1.0) 82%)",
          "borderRadius": "27.0px"
        }
      },
      {
        "kind": "text",
        "name": "Niseko Region",
        "text": "Niseko Region",
        "style": {
          "left": "212.0px",
          "top": "868.0px",
          "width": "112.0px",
          "height": "8.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "11.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "14.85px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "Hiei Temple",
        "text": "Hiei Temple",
        "style": {
          "left": "212.0px",
          "top": "886.0px",
          "width": "112.0px",
          "height": "10.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "18.9px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 23",
        "style": {
          "left": "297.0px",
          "top": "722.0px",
          "width": "48.0px",
          "height": "48.0px",
          "background": "rgba(92, 75, 75, 0.29)",
          "borderRadius": "24.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "311.83px",
          "top": "737.75px",
          "width": "18.33px",
          "height": "16.5px",
          "border": "1.5px solid rgba(255, 255, 255, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 490",
        "style": {
          "left": "0.0px",
          "top": "699.0px",
          "width": "375.0px",
          "height": "113.0px",
          "background": "linear-gradient(135deg, rgba(212, 217, 222, 0.0) 42%, rgba(174, 190, 204, 0.65) 58%)"
        }
      },
      {
        "kind": "shape",
        "name": "Bar",
        "style": {
          "left": "121.0px",
          "top": "799.0px",
          "width": "134.0px",
          "height": "5.0px",
          "background": "rgba(22, 23, 29, 1.0)",
          "borderRadius": "2.5px"
        }
      },
      {
        "kind": "shape",
        "name": "image 42",
        "style": {
          "left": "113.0px",
          "top": "705.0px",
          "width": "142.0px",
          "height": "70.0px",
          "background": "rgba(255, 255, 255, 0.2)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "shape",
        "name": "image 43",
        "style": {
          "left": "113.01px",
          "top": "705.0px",
          "width": "141.97px",
          "height": "70.0px",
          "background": "rgba(255, 255, 255, 0.55)",
          "border": "1.0px solid rgba(255, 255, 255, 0.65)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "140.0px",
          "top": "730.0px",
          "width": "18.0px",
          "height": "20.0px",
          "border": "1.5px solid rgba(0, 0, 0, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 7",
        "style": {
          "left": "184.0px",
          "top": "707.0px",
          "width": "69.0px",
          "height": "66.0px",
          "backgroundImage": "url(/figma-assets-small/33-d53b8a84e2.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat",
          "borderRadius": "25.0px"
        }
      }
    ]
  },
  {
    "name": "Trip Journal",
    "id": "4001:2631",
    "width": 375,
    "height": 812,
    "layers": [
      {
        "kind": "shape",
        "name": "Bar",
        "style": {
          "left": "121.0px",
          "top": "799.0px",
          "width": "134.0px",
          "height": "5.0px",
          "background": "rgba(22, 23, 29, 1.0)",
          "borderRadius": "2.5px"
        }
      },
      {
        "kind": "shape",
        "name": "Vector 1",
        "style": {
          "left": "-66.0px",
          "top": "-100.0px",
          "width": "563.0px",
          "height": "269.5px",
          "background": "linear-gradient(135deg, rgba(125, 175, 220, 1.0) 18%, rgba(252, 236, 206, 1.0) 41%, rgba(251, 227, 141, 1.0) 78%, rgba(253, 236, 183, 1.0) 100%)"
        }
      },
      {
        "kind": "shape",
        "name": "Vector 2",
        "style": {
          "left": "-55.0px",
          "top": "-103.0px",
          "width": "699.0px",
          "height": "363.0px",
          "background": "linear-gradient(135deg, rgba(155, 203, 247, 0.8) 18%, rgba(253, 236, 183, 0.8) 100%)"
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "206.42px",
          "top": "-239.0px",
          "width": "64.35px",
          "height": "533.74px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.09
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "236.32px",
          "top": "-103.94px",
          "width": "401.52px",
          "height": "398.63px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.09
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "-162.11px",
          "top": "-106.82px",
          "width": "398.63px",
          "height": "401.52px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.09
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "236.37px",
          "top": "-209.82px",
          "width": "236.02px",
          "height": "504.55px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.09
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "-268.0px",
          "top": "58.62px",
          "width": "504.56px",
          "height": "236.03px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.09
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "4.64px",
          "top": "-211.33px",
          "width": "231.84px",
          "height": "506.06px",
          "background": "linear-gradient(135deg, rgba(255, 255, 255, 1.0) 0%, rgba(231, 249, 254, 1.0) 100%)",
          "opacity": 0.06
        }
      },
      {
        "kind": "text",
        "name": "Trip Journal",
        "text": "Trip Journal",
        "style": {
          "left": "134.0px",
          "top": "74.0px",
          "width": "107.0px",
          "height": "15.0px",
          "color": "rgba(0, 16, 20, 1.0)",
          "fontSize": "20.0px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "24.6px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 21",
        "style": {
          "left": "24.0px",
          "top": "57.0px",
          "width": "48.0px",
          "height": "48.0px",
          "background": "rgba(240, 243, 245, 0.5)",
          "borderRadius": "24.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 22",
        "style": {
          "left": "303.0px",
          "top": "57.0px",
          "width": "48.0px",
          "height": "48.0px",
          "background": "rgba(240, 243, 245, 0.6)",
          "borderRadius": "24.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Border",
        "style": {
          "left": "314.33px",
          "top": "22.0px",
          "width": "22.0px",
          "height": "11.33px",
          "border": "1.0px solid rgba(0, 0, 0, 1.0)",
          "borderRadius": "2.67px",
          "opacity": 0.35
        }
      },
      {
        "kind": "shape",
        "name": "Capacity",
        "style": {
          "left": "316.33px",
          "top": "24.0px",
          "width": "18.0px",
          "height": "7.33px",
          "background": "rgba(0, 0, 0, 1.0)",
          "borderRadius": "1.33px"
        }
      },
      {
        "kind": "shape",
        "name": "Wifi",
        "style": {
          "left": "294.03px",
          "top": "22.0px",
          "width": "15.27px",
          "height": "10.97px",
          "background": "rgba(0, 0, 0, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "Cellular Connection",
        "style": {
          "left": "272.0px",
          "top": "22.34px",
          "width": "17.0px",
          "height": "10.67px",
          "background": "rgba(0, 0, 0, 1.0)"
        }
      },
      {
        "kind": "text",
        "name": "↳ Time",
        "text": "9:54",
        "style": {
          "left": "25.0px",
          "top": "22.0px",
          "width": "30.0px",
          "height": "10.0px",
          "color": "rgba(0, 0, 0, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 500,
          "fontFamily": "Satoshi Variable, Plus Jakarta Sans, sans-serif",
          "lineHeight": "18.0px",
          "textAlign": "center"
        }
      },
      {
        "kind": "shape",
        "name": "Bar",
        "style": {
          "left": "121.0px",
          "top": "799.0px",
          "width": "134.0px",
          "height": "5.0px",
          "background": "rgba(22, 23, 29, 1.0)",
          "borderRadius": "2.5px"
        }
      },
      {
        "kind": "shape",
        "name": "https://dribbble.com/shots/14262157-Orix-Food-App",
        "style": {
          "left": "24.0px",
          "top": "125.0px",
          "width": "327.0px",
          "height": "77.0px",
          "background": "rgba(255, 255, 255, 1.0)",
          "borderRadius": "28.0px"
        }
      },
      {
        "kind": "shape",
        "name": "https://dribbble.com/shots/14262157-Orix-Food-App",
        "style": {
          "left": "29.87px",
          "top": "131.0px",
          "width": "157.63px",
          "height": "65.0px",
          "background": "rgba(245, 245, 245, 1.0)",
          "borderRadius": "22.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 1000002899",
        "style": {
          "left": "50.43px",
          "top": "143.0px",
          "width": "112.0px",
          "height": "40.0px",
          "background": "rgba(245, 245, 245, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "image 83",
        "style": {
          "left": "50.43px",
          "top": "143.0px",
          "width": "40.0px",
          "height": "40.0px",
          "backgroundImage": "url(/figma-assets-small/27-c09918e815.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat"
        }
      },
      {
        "kind": "text",
        "name": "Timeline",
        "text": "Timeline",
        "style": {
          "left": "98.43px",
          "top": "157.0px",
          "width": "64.0px",
          "height": "12.0px",
          "color": "rgba(18, 20, 23, 1.0)",
          "fontSize": "16.0px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "20.0px",
          "textAlign": "center"
        }
      },
      {
        "kind": "shape",
        "name": "image 84",
        "style": {
          "left": "197.82px",
          "top": "143.0px",
          "width": "40.0px",
          "height": "40.0px",
          "backgroundImage": "url(/figma-assets-small/20-9e1f77fd4a.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat"
        }
      },
      {
        "kind": "text",
        "name": "Storymode",
        "text": "Storymode",
        "style": {
          "left": "245.82px",
          "top": "157.0px",
          "width": "88.0px",
          "height": "12.0px",
          "color": "rgba(18, 20, 23, 1.0)",
          "fontSize": "16.0px",
          "fontWeight": 600,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "20.0px",
          "textAlign": "center"
        }
      },
      {
        "kind": "shape",
        "name": "image",
        "style": {
          "left": "24.0px",
          "top": "226.0px",
          "width": "327.0px",
          "height": "271.0px",
          "backgroundImage": "url(/figma-assets-small/07-43e8fdf846.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat",
          "borderRadius": "30.0px"
        }
      },
      {
        "kind": "shape",
        "name": "image",
        "style": {
          "left": "24.0px",
          "top": "369.0px",
          "width": "327.0px",
          "height": "128.0px",
          "background": "linear-gradient(135deg, rgba(230, 242, 254, 0.0) 35%, rgba(230, 242, 254, 0.05) 97%)",
          "borderRadius": "0.0px 0.0px 31.0px 31.0px"
        }
      },
      {
        "kind": "shape",
        "name": "image",
        "style": {
          "left": "285.0px",
          "top": "244.0px",
          "width": "48.0px",
          "height": "48.0px",
          "backgroundImage": "url(/figma-assets-small/39-f19544b769.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat",
          "border": "2.0px solid rgba(255, 255, 255, 1.0)",
          "borderRadius": "11.0px"
        }
      },
      {
        "kind": "shape",
        "name": "image",
        "style": {
          "left": "285.0px",
          "top": "296.0px",
          "width": "48.0px",
          "height": "48.0px",
          "backgroundImage": "url(/figma-assets-small/31-c8accfa480.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat",
          "borderRadius": "11.0px"
        }
      },
      {
        "kind": "shape",
        "name": "image",
        "style": {
          "left": "285.0px",
          "top": "348.0px",
          "width": "48.0px",
          "height": "48.0px",
          "backgroundImage": "url(/figma-assets-small/02-0df06e24f7.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat",
          "borderRadius": "11.0px"
        }
      },
      {
        "kind": "shape",
        "name": "image",
        "style": {
          "left": "285.0px",
          "top": "348.0px",
          "width": "48.0px",
          "height": "48.0px",
          "background": "rgba(0, 0, 0, 0.3)",
          "borderRadius": "11.0px"
        }
      },
      {
        "kind": "text",
        "name": "+10",
        "text": "+10",
        "style": {
          "left": "295.0px",
          "top": "366.0px",
          "width": "28.0px",
          "height": "12.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "16.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "22.72px",
          "textAlign": "center"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 21",
        "style": {
          "left": "285.0px",
          "top": "431.0px",
          "width": "48.0px",
          "height": "48.0px",
          "background": "rgba(222, 219, 219, 0.34)",
          "borderRadius": "24.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "299.83px",
          "top": "446.75px",
          "width": "18.33px",
          "height": "16.5px",
          "border": "1.5px solid rgba(255, 255, 255, 1.0)"
        }
      },
      {
        "kind": "text",
        "name": "Daisen (いせん)",
        "text": "Daisen (いせん)",
        "style": {
          "left": "46.0px",
          "top": "369.0px",
          "width": "174.0px",
          "height": "18.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "24.0px",
          "fontWeight": 700,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "28.0px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "Tottori Prefecture",
        "text": "Tottori Prefecture",
        "style": {
          "left": "46.0px",
          "top": "401.0px",
          "width": "177.0px",
          "height": "10.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 400,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "21.0px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "17 Km from your location",
        "text": "17 Km from your location ",
        "style": {
          "left": "66.0px",
          "top": "426.5px",
          "width": "116.0px",
          "height": "7.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "10.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "21.0px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 12",
        "style": {
          "left": "46.0px",
          "top": "453.0px",
          "width": "69.0px",
          "height": "24.0px",
          "background": "rgba(4, 56, 72, 0.68)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "text",
        "name": "Mountain",
        "text": "Mountain",
        "style": {
          "left": "58.0px",
          "top": "461.5px",
          "width": "45.0px",
          "height": "7.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "10.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "12.3px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 19",
        "style": {
          "left": "121.0px",
          "top": "453.0px",
          "width": "64.0px",
          "height": "24.0px",
          "background": "rgba(4, 56, 72, 0.68)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "text",
        "name": "Spiritual",
        "text": "Spiritual",
        "style": {
          "left": "133.0px",
          "top": "461.5px",
          "width": "40.0px",
          "height": "7.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "10.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "12.3px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "image",
        "style": {
          "left": "24.0px",
          "top": "509.0px",
          "width": "327.0px",
          "height": "271.0px",
          "backgroundImage": "url(/figma-assets-small/08-46c9fcb9fc.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat",
          "borderRadius": "30.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Shado",
        "style": {
          "left": "24.0px",
          "top": "509.0px",
          "width": "327.0px",
          "height": "271.0px",
          "background": "linear-gradient(135deg, rgba(254, 235, 227, 0.1) 20%, rgba(70, 71, 75, 1.0) 100%)",
          "borderRadius": "30.0px"
        }
      },
      {
        "kind": "shape",
        "name": "image",
        "style": {
          "left": "24.0px",
          "top": "679.0px",
          "width": "327.0px",
          "height": "101.0px",
          "background": "linear-gradient(135deg, rgba(70, 71, 75, 0.0) 35%, rgba(70, 71, 75, 0.05) 97%)",
          "borderRadius": "0.0px 0.0px 30.0px 30.0px"
        }
      },
      {
        "kind": "shape",
        "name": "image",
        "style": {
          "left": "285.0px",
          "top": "527.0px",
          "width": "48.0px",
          "height": "48.0px",
          "backgroundImage": "url(/figma-assets-small/08-46c9fcb9fc.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat",
          "border": "2.0px solid rgba(255, 255, 255, 0.8)",
          "borderRadius": "11.0px"
        }
      },
      {
        "kind": "shape",
        "name": "image",
        "style": {
          "left": "285.0px",
          "top": "579.0px",
          "width": "48.0px",
          "height": "48.0px",
          "backgroundImage": "url(/figma-assets-small/38-ef0403522c.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat",
          "borderRadius": "11.0px"
        }
      },
      {
        "kind": "shape",
        "name": "image",
        "style": {
          "left": "285.0px",
          "top": "631.0px",
          "width": "48.0px",
          "height": "48.0px",
          "backgroundImage": "url(/figma-assets-small/14-7eaf740be7.jpg)",
          "backgroundSize": "cover",
          "backgroundPosition": "center",
          "backgroundRepeat": "no-repeat",
          "borderRadius": "11.0px"
        }
      },
      {
        "kind": "shape",
        "name": "image",
        "style": {
          "left": "285.0px",
          "top": "631.0px",
          "width": "48.0px",
          "height": "48.0px",
          "background": "rgba(0, 0, 0, 0.6)",
          "borderRadius": "11.0px"
        }
      },
      {
        "kind": "text",
        "name": "+10",
        "text": "+10",
        "style": {
          "left": "295.0px",
          "top": "649.0px",
          "width": "28.0px",
          "height": "12.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "16.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "22.72px",
          "textAlign": "center"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 21",
        "style": {
          "left": "285.0px",
          "top": "714.0px",
          "width": "48.0px",
          "height": "48.0px",
          "background": "rgba(222, 219, 219, 0.34)",
          "borderRadius": "24.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "299.83px",
          "top": "729.75px",
          "width": "18.33px",
          "height": "16.5px",
          "border": "1.5px solid rgba(255, 255, 255, 1.0)"
        }
      },
      {
        "kind": "text",
        "name": "Ukai (鵜飼)",
        "text": "Ukai (鵜飼)",
        "style": {
          "left": "46.0px",
          "top": "652.0px",
          "width": "122.0px",
          "height": "18.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "24.0px",
          "fontWeight": 700,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "28.0px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "Nagara River",
        "text": "Nagara River",
        "style": {
          "left": "46.0px",
          "top": "684.0px",
          "width": "177.0px",
          "height": "10.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "14.0px",
          "fontWeight": 400,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "21.0px",
          "textAlign": "left"
        }
      },
      {
        "kind": "text",
        "name": "60 Km from your location",
        "text": "60 Km from your location ",
        "style": {
          "left": "66.0px",
          "top": "709.5px",
          "width": "120.0px",
          "height": "7.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "10.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "21.0px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 12",
        "style": {
          "left": "46.0px",
          "top": "736.0px",
          "width": "62.0px",
          "height": "24.0px",
          "background": "rgba(55, 64, 70, 1.0)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "text",
        "name": "Cultural",
        "text": "Cultural",
        "style": {
          "left": "58.0px",
          "top": "744.5px",
          "width": "38.0px",
          "height": "7.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "10.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "12.3px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Frame 19",
        "style": {
          "left": "114.0px",
          "top": "736.0px",
          "width": "58.0px",
          "height": "24.0px",
          "background": "rgba(55, 64, 70, 1.0)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "text",
        "name": "Fishing",
        "text": "Fishing",
        "style": {
          "left": "126.0px",
          "top": "744.5px",
          "width": "34.0px",
          "height": "7.0px",
          "color": "rgba(255, 255, 255, 1.0)",
          "fontSize": "10.0px",
          "fontWeight": 500,
          "fontFamily": "Plus Jakarta Sans, Plus Jakarta Sans, sans-serif",
          "lineHeight": "12.3px",
          "textAlign": "left"
        }
      },
      {
        "kind": "shape",
        "name": "Rectangle 489",
        "style": {
          "left": "0.0px",
          "top": "719.0px",
          "width": "375.0px",
          "height": "93.0px",
          "background": "linear-gradient(135deg, rgba(212, 217, 222, 0.0) 41%, rgba(166, 185, 202, 1.0) 69%)"
        }
      },
      {
        "kind": "shape",
        "name": "image 42",
        "style": {
          "left": "113.0px",
          "top": "705.0px",
          "width": "142.0px",
          "height": "70.0px",
          "background": "rgba(255, 255, 255, 0.2)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "shape",
        "name": "image 43",
        "style": {
          "left": "113.01px",
          "top": "705.0px",
          "width": "141.97px",
          "height": "70.0px",
          "background": "rgba(255, 255, 255, 0.55)",
          "border": "1.0px solid rgba(255, 255, 255, 0.65)",
          "borderRadius": "26.0px"
        }
      },
      {
        "kind": "shape",
        "name": "Vector",
        "style": {
          "left": "140.0px",
          "top": "730.0px",
          "width": "18.0px",
          "height": "20.0px",
          "border": "1.5px solid rgba(0, 0, 0, 1.0)"
        }
      },
      {
        "kind": "shape",
        "name": "Bar",
        "style": {
          "left": "121.0px",
          "top": "799.0px",
          "width": "134.0px",
          "height": "5.0px",
          "background": "rgba(22, 23, 29, 1.0)",
          "borderRadius": "2.5px"
        }
      }
    ]
  }
] satisfies EditableFigmaScreen[]
