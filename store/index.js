import Cookie from "js-cookie";

export const state = () => ({
  portfolioList: [],
  portfolioDetail: null,
  token: null,
  userData: null,
});

export const getters = {
  portfolioData(state) {
    return state.portfolioList;
  },

  isAuthenticated(state) {
    return state.token != null;
  },

  userId(state) {
    if (state.userData) {
      return state.userData.userId;
    } else {
      return null;
    }
  },

  isAuth(state) {
    return state.token != null;
  },

  userEmail(state) {
    if (state.userData) {
      return state.userData.email;
    } else {
      return null;
    }
  },
};

export const mutations = {
  addNewPortfolio(state, payload) {
    state.portfolioList.push(payload);
  },

  getPortfolioList(state, payload) {
    state.portfolioList = payload;
  },
  getPortfolioDetail(state, payload) {
    state.portfolioDetail = payload;
  },

  setToken(state, payload) {
    state.token = payload;
  },

  setUserData(state, payload) {
    state.userData = payload;
  },
};

export const actions = {
  async getPortfolioList({ commit }) {
    const response = await this.$axios.$get(
      "https://spacial-445bd-default-rtdb.firebaseio.com/portfolio.json"
    );

    const portfolioArray = [];

    for (const key in response) {
      portfolioArray.push({ ...response[key], id: key });
    }

    commit("getPortfolioList", portfolioArray);
  },

  async addPortfolio({ state }, portfolio) {
    await this.$axios.$post(
      "https://spacial-445bd-default-rtdb.firebaseio.com/portfolio.json?auth=" +
        state.token,
      {
        ...portfolio,
        userId: state.userData.userId,
        userName: state.userData.username,
        dataLikes: ["null"],
      }
    );
  },

  async getPortfolioDetail({ commit }, portfolioId) {
    const response = await this.$axios.$get(
      "https://spacial-445bd-default-rtdb.firebaseio.com/dataPortfolio/" +
        portfolioId +
        ".json"
    );

    commit("getPortfolioDetail", response);

    return response;
  },

  authenticateUser({ commit }, authData) {
    let webAPIKey = "AIzaSyDtwnQQqLlb7_vIXTcqGASqaRY_DjmqUno";
    let authUrl = authData.isLogin
      ? "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
      : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
    return this.$axios
      .$post(authUrl + webAPIKey, {
        email: authData.email,
        password: authData.password,
        displayName: authData.displayName,
        returnSecureToken: true,
      })
      .then((response) => {
        commit("setToken", response.idToken);
        commit("setUserData", {
          username: response.displayName,
          userId: response.localId,
          email: response.email,
        });
        localStorage.setItem("token", response.idToken);
        Cookie.set("jwt", response.idToken);

        const userData = {
          username: response.displayName,
          userId: response.localId,
          email: response.email,
        };

        localStorage.setItem("user", JSON.stringify(userData));
        Cookie.set("acc_user", JSON.stringify(userData));
      })
      .catch((error) => {
        console.log(error);
      });
  },

  initAuth({ commit }, req) {
    let user;
    let token;

    if (req) {
      if (!req.headers.cookie) {
        return;
      }
      const jwtCookie = req.headers.cookie
        .split(";")
        .find((c) => c.trim().startsWith("jwt="));

      const accUserCookie = req.headers.cookie
        .split(";")
        .find((c) => c.trim().startsWith("acc_user="));

      const userCookie = accUserCookie.substr(accUserCookie.indexOf("=") + 1);
      user = JSON.parse(decodeURIComponent(userCookie));

      if (!jwtCookie) {
        return;
      }
      token = jwtCookie.split("=")[1];
    } else {
      token = localStorage.getItem("token");
      user = JSON.parse(localStorage.getItem("user"));
    }
    commit("setToken", token);
    commit("setUserData", user);
  },

  logout({ commit }) {
    commit("setToken", null);
    Cookie.remove("jwt");
    Cookie.remove("acc_user");
    if (process.client) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },

  async likeUpdate({ state }, portfolio) {
    const url =
      "https://spacial-445bd-default-rtdb.firebaseio.com/dataPortfolio/" +
      portfolio.portfolioId +
      ".json?auth=" +
      state.token;

    await this.$axios.$put(url, portfolio.newDataPortfolio);
  },
};
