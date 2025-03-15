# Use an official Python image as the base
FROM python:3.10

# Install dependencies
RUN apt-get update && \
    apt-get install -y git curl && \
    rm -rf /var/lib/apt/lists/*

# Install Node.js for the Next.js app
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm@latest

# Install CodeQL
RUN git clone --depth=1 https://github.com/github/codeql.git /opt/codeql && \
    ln -s /opt/codeql/codeql /usr/local/bin/codeql

# Clone repositories
WORKDIR /app
RUN git clone https://github.com/Argimirodelpozo/ClarityFuzzer.git && \
    git clone https://github.com/rgermanm/yarara-fe.git

# Install Python dependencies for ClarityFuzzer
RUN pip install tree-sitter tree-sitter-clarity

# Install dependencies for yarara-dashboard-bff (Node.js app)
WORKDIR /app/yarara-fe/yarara-dashboard-bff
RUN npm install

# Install dependencies for yarara-dashboard (Next.js app)
WORKDIR /app/yarara-fe/yarara-dashboard
RUN npm install

# Run ClarityTranspiler.py
WORKDIR /app/ClarityFuzzer/ClarityTranspiler
CMD ["python", "ClarityTranspiler.py"]
