# Example Stitch App

This is a simple Next.js app designed to demonstrate the Stitch App integration in Backstage.

## How to Run

1.  Navigate to this directory:
    ```bash
    cd packages/app/examples/next-app
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn
    ```

3.  Run the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

4.  The app will start at `http://localhost:3000`.

## Integration with Backstage

To test this app in Backstage:

1.  Ensure this app is running (e.g., on port 3000).
2.  Create an App entity in Backstage that points to this URL.
    -   Embed URL: `http://localhost:3000`
3.  Navigate to the app in Backstage (e.g., `/app/my-example-app`).
4.  You should see "Hello World" and the parameters passed from Backstage.
