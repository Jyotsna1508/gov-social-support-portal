```env

🔑 OpenAI API Key Setup

1. Go to the OpenAI website  
2. Navigate to **API Keys**  
3. Click **Generate Secret Key**  
4. Give your project a name and copy the generated key  
5. Create a `.env` file  
6. At the root of the project, add:
VITE_REACT_APP_OPENAI_API_KEY=your_secret_key_here
⚠️ Note: Never commit your .env file to version control.

▶️ How to Run the Project

# Clone the repository
git clone <repository-url>

# Navigate to the project
cd <project-folder>

⚠️ Note: Developed with node version 22.17.1 (if any issues come in npm i try new version of node)
# Install dependencies
npm install

# Start the development server
npm run dev
🏗️ Project Architecture

This project follows a feature-based architecture for better scalability and maintainability.
src/
│
├── public/            # Public files accessible without auth (favicon, static files)
├── assets/            # Images, icons, and static media
│
├── components/
│   ├── ui/             # Reusable UI components (inputs, stepper, loader, errorBoundary)
│   ├── layout/         # Layout components (header, footer)
│   ├── wizard/         # Feature-specific components (multi-step form)
│   └── ai/             # AI-related components (streaming UI, suggestions)
│
├── constants/          # App-wide constants
├── hooks/              # Custom React hooks
├── store/              # Redux store and slices (thunk for middleware - mock form submit)
├── context/            # Global contexts (language,)
├── services/           # API calls & external integrations (openAL call)
├── routes/             # Application routing (lazy laoded step 2 and step 3 for performance optimization)
├── i18n/               # Internationalization setup & translations (EN and AR)
├── utils/              # Helper and utility functions (form utils, error handlers)
├── types/              # TypeScript types & interfaces (definition types file for AI and form)
│
├── .env                # Environment variables

🏗️ Tech Stack - React 19, react-hook-form, react-i18next, redux, vitest, MUI and tailwind

⚙️ Performance Optimizations

1.Lazy loading implemented for Step 2 and Step 3 of the wizard
2.Used useCallback to avoid unnecessary re-renders
3.Prevent inline function recreation
4.Optimize expensive calculations using useMemo

✅ Form Validations

Each field includes strict validation:
1. All inputs - required
2. Name - Minimum 3 characters
3. Email - Valid email format
4. Phone Number - UAE-specific phone number validation(+971/05) both are supported
5. Age - Allowed range: 18–60 only
6. National ID to be numeric with 9-12 digits
7. Step 3 (AI Section) fields - Minimum 10 words required for:

What influnced my decisions

1. AI streaming handled by using Fetch API for streaming purpose to give a feel of ai agent typing.
   I have chosen fetch over axios because fetch has Native support for AbortController and better handling of streaming responses
   and Axios does not support response streaming properly.
2. Styling & UI
   Tailwind CSS for fast, utility-first styling providing support for all screen sizes and Material UI (MUI) for free built components that is responsive
3. Context API used alongside Redux where appropriate(for language switcher as it is controlled from one place only)
4. Vitest for unit testing as Jest is not supported with Vite, so Vitest is used instead
5. Redux persist to persist state on page refresh
6. Prompt generator to generate prompt based on financial data taken in step 2 for better AI experience.

🔮 Future Improvements
1- Adding phone number validations depending upon country selected, right now its just UAE phone validation.
2- Expand country options in forms (right now only 5 mocked countries to be replaced with API data)
3- Move OpenAI API calls to backend (Frontend usage is not recommended for security reasons)
4- Improve test coverage for AI streaming and form validation

Desktop view:-
<img width="940" height="476" alt="image" src="https://github.com/user-attachments/assets/03e3fe22-c46b-4e28-8687-6c1644f7c61c" />

Tablet view (Ipad pro):-
<img width="940" height="1129" alt="image" src="https://github.com/user-attachments/assets/096eed5c-4368-4c92-9489-9002d463cdea" />

Mobile view (Iphone):-
<img width="940" height="986" alt="image" src="https://github.com/user-attachments/assets/f9636179-bd08-414a-81fc-e596a1b6c758" />

AI response with request(in form of prompt):-
<img width="940" height="500" alt="image" src="https://github.com/user-attachments/assets/a61ba35a-ccc7-4fd0-8a3a-45bfb42df023" />

AI response error handling:-
<img width="940" height="505" alt="image" src="https://github.com/user-attachments/assets/5999b39d-154c-4bfe-9858-cea4a11707fd" />

Form validation:-
<img width="1292" height="815" alt="image" src="https://github.com/user-attachments/assets/051b3137-68d1-4c43-b242-7682a6555724" />
<img width="1239" height="883" alt="image" src="https://github.com/user-attachments/assets/f8358af0-9a85-4533-bf18-4916d96bbd16" />



Test cases screenshot:-
<img width="940" height="307" alt="image" src="https://github.com/user-attachments/assets/f32ee524-876f-49d2-91dd-1bed23326fa0" />

Form Submitted (user navigate to step 1 with success message):-
<img width="940" height="473" alt="image" src="https://github.com/user-attachments/assets/e3eed2a8-d504-4299-bf5a-00fd37d2f665" />





