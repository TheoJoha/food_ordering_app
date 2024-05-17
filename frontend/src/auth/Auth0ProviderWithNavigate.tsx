import { AppState, Auth0Provider, User, useAuth0 } from "@auth0/auth0-react";
// import { useCreateMyUser } from "../api/MyUserApi";
import { useNavigate } from "react-router-dom";

type Props = {
    children: React.ReactNode;
}
const Auth0ProviderWithNavigate = ({ children }: Props) => {
    const navigate = useNavigate();
    const {getAccessTokenSilently} = useAuth0();
    
    const domain = import.meta.env.VITE_AUTH_DOMAIN
    const clientId = import.meta.env.VITE_UTH0_CLIENT_ID
    const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;

    if (!domain || !clientId || !redirectUri) {
        throw new Error("unable to initialize auth")
    }

    const onRedirectCallback = async (appState?: AppState, user?: User) => {
        const token = await getAccessTokenSilently()
        navigate("/auth-callback")
    }

    return (
        <Auth0Provider
            domain={domain} clientId={clientId} authorizationParams={{
                redirect_uri: redirectUri,
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    )

}

export default Auth0ProviderWithNavigate