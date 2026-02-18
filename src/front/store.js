// ESTADO INICIAL
export const initialStore = () => {
  return {
    // Autenticación
    token: localStorage.getItem("token") || null,
    user: null,
    isAuthenticated: !!localStorage.getItem("token"),

    // Usuario
    userProfile: null,

    // Feed
    activities: [],

    // UI global
    isPostModalOpen: false,
    isProfileDropdownOpen: false
  };
};

// REDUCER GLOBAL
export default function storeReducer(store, action = {}) {
  switch (action.type) {

    // --- LOGIN ---
    case "login_success":
      localStorage.setItem("token", action.payload.token);
      return {
        ...store,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true
      };

    // --- LOGOUT ---
    case "logout":
      localStorage.removeItem("token");
      return {
        ...store,
        token: null,
        user: null,
        isAuthenticated: false
      };

    // --- PERFIL ---
    case "SET_USER_PROFILE":
      return {
        ...store,
        userProfile: action.payload
      };

    // --- FEED ---
    case "SET_ACTIVITIES":
      return {
        ...store,
        activities: action.payload
      };

    // --- UI ---
    case "TOGGLE_POST_MODAL":
      return {
        ...store,
        isPostModalOpen: !store.isPostModalOpen
      };

    case "TOGGLE_PROFILE_DROPDOWN":
      return {
        ...store,
        isProfileDropdownOpen: !store.isProfileDropdownOpen
      };

    default:
      throw Error("Unknown action.");
  }
}
