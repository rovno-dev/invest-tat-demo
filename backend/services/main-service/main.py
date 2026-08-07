from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from pydantic import ValidationError
from fastapi import HTTPException
import os
import logging

from app.api.router import router
from config.rate_limiter import global_rate_limit
from config.logging import setup_logging

setup_logging()
logger = logging.getLogger(__name__)
logger.info("Starting main service")

app = FastAPI(
    title="Main Service",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.middleware("http")(global_rate_limit)

app.include_router(router)

storage_dir = os.path.join(os.getcwd(), "storage", "public")
os.makedirs(storage_dir, exist_ok=True)
app.mount("/storage", StaticFiles(directory=storage_dir), name="storage")

@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "service": "main-service",
    }


@app.exception_handler(ValidationError)
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):

    errors = {}
    for error in exc.errors():
        field = error["loc"][-1] if error["loc"] else "non_field_error"
        msg = error["msg"]
        if msg.startswith("Value error, "):
            msg = msg.replace("Value error, ", "", 1)

        errors[field] = msg

    return JSONResponse(
        status_code=422,
        content={"errors": errors},
    )

#
# @app.exception_handler(HTTPException)
# async def http_exception_handler(request: Request, exc: HTTPException):
#     detail = exc.detail
#
#     return JSONResponse(
#         status_code=exc.status_code,
#         content={"message": detail},
#     )