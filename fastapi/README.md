# FastAPI Todo Application

This is a simple Todo application built using FastAPI, SQLAlchemy, and Pydantic. The application includes endpoints for creating and reading todo items, with user authentication and authorization implemented using JWT tokens.

## Prerequisites

- Python 3.8+
- Virtual environment (recommended)
- SQLite (default database for simplicity)

## Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/ParmenidesSartre/TodoPolyglot.git
   cd fastapi
   ```

2. **Create a virtual environment**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install the dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Create a `.env` file**

   Create a `.env` file in the root directory of your project with the following content:

   ```
   SECRET_KEY=your_secret_key
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   ```

5. **Run database migrations**

   Create and apply initial database migrations using Alembic. (Assuming Alembic is set up in your project)

   ```bash
   alembic upgrade head
   ```

6. **Run the FastAPI application**

   Start the FastAPI application:

   ```bash
   uvicorn app.main:app --reload
   ```
