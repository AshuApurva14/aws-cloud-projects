FROM python:3.12-slim-trixie

# Iinstall specific version of uv
COPY --from=ghcr.io/astral-sh/uv:0.9.27 /uv /uvx /bin/

# Copy the project into the image
COPY ./webapp /app

# Disable development dependencies
ENV UV_NO_DEV=1

# Sync the project into a new environment, asserting the lockfile is up to date
WORKDIR /app
RUN uv sync --locked

# Presuming there is a `main.py` command provided by the project
CMD ["uv", "run", "main.py"]
