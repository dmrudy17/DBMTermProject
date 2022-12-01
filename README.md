# DDK Review Setup Instructions

1. Ensure you have the latest version of Node.js installed at https://nodejs.org/en/
2. Download the Vue CLI at https://cli.vuejs.org/
3. Obtain RAWG Video Games Database API key from their site https://rawg.io/apidocs

    - Note: you will need to create a RAWG user account in order to obtain a key

4. Obtain Supabase API key from DDK team (invitations sent out upon request and validation)

5. Create a `.ENV` file in the root directory of the DDK Review project

    - The variables within this file should follow this format

    ```
    VITE_SUPABASE_URL=YOUR_SUPABASE_URL;
    VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY;
    VITE_RAWG_API_KEY=YOUR_RAWG_API_KEY;
    ```

6. Install all other needed dependencies by issuing the following command in the root of the project

    ```console
    npm install
    ```

7. Run the app locally by issuing the following command

    ```console
    npm run dev
    ```
