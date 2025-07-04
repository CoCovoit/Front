
export function parseJwt(token: string): unknown {
    try {
        // Split the token into its components
        const base64Url = token.split('.')[1];

        // Replace the base64Url characters with standard base64 characters and decode it
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );

        // Parse the decoded payload as JSON
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Failed to parse JWT', error);
        return null;
    }
}
