import os
import httpx
import logging

logger = logging.getLogger(__name__)

async def send_sms(phone: str, text: str) -> bool:
    api_key = os.getenv("PHONE_TOKEN")
    sender = os.getenv("PHONE_NAME_SENDER")
    provider_url = os.getenv("PHONE_PROVIDER_URL")

    if not api_key or not sender or not provider_url:
        logger.warning("SMS provider credentials not configured. SMS would have been: %s", text)
        # In development, pretend it worked
        return True

    # Ensure the URL ends with /apiSms/create
    if not provider_url.endswith("/apiSms/create"):
        provider_url = provider_url.rstrip("/") + "/apiSms/create"

    logger.info("Sending SMS to %s via %s", phone, provider_url)

    try:
        async with httpx.AsyncClient(timeout=10.0, trust_env=None) as client:
            response = await client.post(
                provider_url,
                json={
                    "sms": [
                        {
                            "text": text,
                            "phone": phone,
                            "sender": sender,
                            "channel": "char"
                        }
                    ],
                    "apiKey": api_key
                },
            )
        if response.status_code == 200:
            logger.info(f"SMS sent successfully, code: {text}")
            return True
        else:
            logger.error("SMS failed with status %d: %s", response.status_code, response.text)
            return False
    except httpx.TimeoutException:
        logger.error("SMS provider timeout for %s", phone)
        return False
    except Exception as e:
        logger.error("SMS error: %s", e)
        return False
