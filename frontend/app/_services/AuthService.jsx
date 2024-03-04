/**
 * @author Full Stack Developer
 * @since 2024-03-04
 * @description authorization functions
 */

const keycloakUri = process.env.NEXT_PUBLIC_KEYCLOAK_URI;
const keycloakRealm = process.env.NEXT_PUBLIC_KEYCLOAK_REALM
const protocolOpenidConnect = process.env.NEXT_PUBLIC_PROTOCOL_OPENID_CONNECT
const authorizationObject = process.env.NEXT_PUBLIC_AUTHORIZATION_OBJECT
const clientId = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID

/**
 * Login a user based on the below params and create a session in Keycloak
 * and a session in the browser (sessionstorage)
 * @param {String} username - The username provided in the login form
 * @param {String} password - The password provided in the login form
 * @returns {String} the response object from the Keycloak endpoint
 */
const login = async (username, password) => {
  // make the call to Keycloak
  return await fetch(
    `${keycloakUri}/realms/${keycloakRealm}/${protocolOpenidConnect}/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: new URLSearchParams({
        grant_type: "password",
        client_id: clientId,
        username: username,
        password: password
      }),
    }
  )
    // get the response from Keycloak
    .then((res) => {
      const authorizationDetails = res.json();

      authorizationDetails.then((tokenDetails) => {
        // if credentials are correct, there is a access_token within the JSON response body
        if (tokenDetails.access_token) {
          // save the authorization token details within the sessionstorage as an object
          sessionStorage.setItem(authorizationObject, JSON.stringify(tokenDetails));
        }
      })

      return res;
    });
};

/**
 * Logout a user and remove the session from Keycloak and the session
 * from the browser (sessionstorage)
 * @returns {String} the response object from the Keycloak endpoint
 */
const logout = async () => {
  // retrieve the refresh token from the sessionstorage token details object
  const refreshToken = getCurrentAuthorizationObject().refresh_token

  // make the call to Keycloak
  return await fetch(
    `${keycloakUri}/realms/${keycloakRealm}/${protocolOpenidConnect}/logout`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: new URLSearchParams({
        client_id: clientId,
        refresh_token: refreshToken
      }),
    }
  )
    // get the response from Keycloak
    .then((res) => {
      // remove the authorization token details object from the sessionstorage
      sessionStorage.removeItem(authorizationObject)

      return res;
    });
}

/**
 * Retrieve the authorization token details object from the sessionstorage
 * @returns {Object} authorization token details object from the sessionstorage
 */
const getCurrentAuthorizationObject = () => {
  return JSON.parse(sessionStorage.getItem(authorizationObject));
};

export default {
  login,
  logout
};