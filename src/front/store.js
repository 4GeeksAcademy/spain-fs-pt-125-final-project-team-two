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
    selectedActivity: null,

    // Historial de clases
    contactHistory: JSON.parse(localStorage.getItem("contactHistory")) || [],

    // UI global
    isPostModalOpen: false,
    isProfileDropdownOpen: false,
    isLoginModalOpen: false
  };
};

// REDUCER GLOBAL
export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "login_success":
      localStorage.setItem("token", action.payload.token);
      return {
        ...store,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
      };

    case "SET_USER":
      return {
        ...store,
        user: action.payload,
        isAuthenticated: true,
      };

    case "logout":
      localStorage.removeItem("token");
      return {
        ...store,
        token: null,
        user: null,
        isAuthenticated: false,
      };

    case "SET_USER_PROFILE":
      return {
        ...store,
        userProfile: action.payload,
      };

    case "SET_ACTIVITIES":
      return {
        ...store,
        activities: action.payload,
      };

    case "ADD_CONTACT_HISTORY": // <--- Nueva pieza: guarda las citas
      const newHistory = [action.payload, ...store.contactHistory];
      localStorage.setItem("contactHistory", JSON.stringify(newHistory));
      return {
        ...store,
        contactHistory: newHistory,
      };

    case "SET_SELECTED_ACTIVITY":
      return {
        ...store,
        selectedActivity: action.payload,
      };

    case "TOGGLE_POST_MODAL":
      return {
        ...store,
        isPostModalOpen: !store.isPostModalOpen,
      };

    case "TOGGLE_PROFILE_DROPDOWN":
      return {
        ...store,
        isProfileDropdownOpen: !store.isProfileDropdownOpen,
      };

    case "TOGGLE_LOGIN_MODAL":
      return {
        ...store,
        isLoginModalOpen: !store.isLoginModalOpen
      }

    default:
      throw Error("Unknown action.");
  }
}