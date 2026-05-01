import os
from pathlib import Path
from pydantic import BaseModel
from dotenv import load_dotenv

HERE = Path(__file__).resolve()
BACKEND_DIR = HERE.parents[2]
REPO_ROOT = BACKEND_DIR.parent

# Load in order: repo root then backend; backend wins on conflicts.
load_dotenv(REPO_ROOT / ".env", override=False)
load_dotenv(BACKEND_DIR / ".env", override=True)


def _env_list(name: str, default: list[str]) -> list[str]:
    raw = os.getenv(name)
    if not raw:
        return default
    return [x.strip() for x in raw.split(",") if x.strip()]


def _env_bool(name: str, default: bool) -> bool:
    raw = os.getenv(name)
    if raw is None:
        return default
    return raw.strip().lower() in {"1", "true", "yes", "on"}


class Settings(BaseModel):
    app_name: str = os.getenv("APP_NAME", "Regional Travel Guide API")
    city_default: str = os.getenv("CITY_DEFAULT", "nkp")
    allowed_cities: list[str] = _env_list("ALLOWED_CITIES", ["nkp"])
    llm_timeout_seconds: float = float(os.getenv("LLM_TIMEOUT_SECONDS", "3.0"))
    api_key_header: str = os.getenv("API_KEY_HEADER", "x-api-key")
    api_key: str = os.getenv("API_KEY", "dev-local-key")
    cors_allow_origins: list[str] = _env_list(
        "CORS_ALLOW_ORIGINS",
        ["http://localhost:5173", "http://127.0.0.1:5173"],
    )
    llm_intent_enabled: bool = _env_bool("LLM_INTENT_ENABLED", True)
    openrouter_base_url: str = os.getenv("OPENROUTER_BASE_URL", "https://openrouter.ai/api/v1")
    openrouter_api_key: str = os.getenv("OPENROUTER_API_KEY", "")
    openrouter_model_primary: str = os.getenv(
        "OPENROUTER_MODEL_PRIMARY",
        "inclusionai/ling-2.6-1t:free",
    )
    openrouter_model_fallback: str = os.getenv(
        "OPENROUTER_MODEL_FALLBACK",
        "openai/gpt-oss-120b:free",
    )
    openrouter_timeout_seconds: float = float(os.getenv("OPENROUTER_TIMEOUT_SECONDS", "3.0"))


settings = Settings()
