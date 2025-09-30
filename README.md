# copilot-rental-agreement-agent
This repository demonstrates an end-to-end solution for automating rental agreement processing using **Microsoft Copilot Studio**, **Computer-Using Agents (CUA)**, and **AI Builder**, integrated with a custom-built web application.

## 🚀 Overview

The solution consists of two main components:

1. **Copilot Studio Agent**  
   An AI-powered agent that:
   - Processes rental agreement documents.
   - Extracts key information using **AI Builder**.
   - Adds a new record in a web application using **CUA-based UI automation**.

2. **Web Application**  
   Built with:
   - **React** (frontend)
   - **.NET Core** (backend)
   - **Azure SQL Server** (database)  
   This app allows users to manage rental agreements—view, edit, and store contract data securely.

## 🧩 Key Features

- Automates document processing and data entry.
- Uses AI Builder for intelligent form recognition.
- Demonstrates practical use of CUA for UI automation in web apps.
- Integrates modern web technologies with low-code AI capabilities.

## ⚠️ Limitations & Considerations

- **CUA is still evolving** and best suited for **basic tasks in web applications**.
- Success rate in **web apps is ~80%**, while in **desktop apps it drops to ~35%**.
- Not recommended for **complex or sensitive domains** like financial or healthcare systems.
- For production use, prefer running the agent on a **configured Windows machine** rather than a hosted one.

> 💡 Like any AI tool, prompt clarity is essential. Instructions must be specific and use accurate terminology (e.g., “fill in the form” instead of “submit the form”) to ensure reliable execution.

> 🔐 Microsoft notes that computer-use automation may pose security risks if instructions are ambiguous or screen content is unexpected. These risks can affect device, data, or account security.
> 
