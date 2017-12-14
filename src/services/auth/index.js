import { HTTP } from '../../http-common';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const LINKED_GITHUB = 'LINKED_GITHUB';
const UNLINKED_GITHUB = 'UNLINKED_GITHUB';
const auth = {
  state() {
    return {
      authenticated: false,
      isGitHubAuthenticated: false,
      userId: null,
      token: null,
    };
  },
  mutations: {
    [LOGIN](state, res) {
      const localStorage = state;
      localStorage.token = res.token;
      localStorage.userId = res.id;
      localStorage.authenticated = true;
      localStorage.isGitHubAuthenticated = res.isGitHubAuthenticated;
    },

    [LOGOUT](state) {
      const localStorage = state;
      localStorage.token = null;
      localStorage.userId = null;
      localStorage.authenticated = false;
      localStorage.isGitHubAuthenticated = false;
    },

    [LINKED_GITHUB](state) {
      const localStorage = state;
      localStorage.isGitHubAuthenticated = true;
    },

    [UNLINKED_GITHUB](state) {
      const localStorage = state;
      localStorage.isGitHubAuthenticated = false;
    },
  },
  actions: {
    login({ commit }, credentials) {
      return HTTP.post('authenticate', {
        email: credentials.email,
        password: credentials.password,
      })
        .then((response) => {
          let res;
          const headers = { Authorization: response.data.auth_token };

          HTTP.get(`users/${response.data.user.id}`, { headers })
            .then((secondResponse) => {
              let isGitHubAuthenticated;

              if (secondResponse.data.access_token != null) {
                isGitHubAuthenticated = true;
              } else {
                isGitHubAuthenticated = false;
              }

              res = {
                token: response.data.auth_token,
                id: response.data.user.id,
                isGitHubAuthenticated,
              };

              commit(LOGIN, res);
            });
        });
    },

    logout({ commit }) {
      commit(LOGOUT);
    },

    linkGithub({ commit }, credentials) {
      return HTTP.post('request_github_token', {
        id: credentials.userId,
        code: credentials.code,
      }, { headers: credentials.headers })
        .then(() => {
          commit(LINKED_GITHUB);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    // unlinkGithub({ commit }, credentials) {
    //   return HTTP.post('remove_github_token', {
    //     id: credentials.userId,
    //   }, { headers: credentials.headers })
    //     .then(() => {
    //       commit(UNLINKED_GITHUB);
    //     })
    //     .catch((e) => {
    //       this.errors.push(e);
    //     });
    // },

    linkedGitHub({ commit }) {
      commit(LINKED_GITHUB);
    },

    unlinkedGitHub({ commit }) {
      commit(UNLINKED_GITHUB);
    },
  },
};

export default auth;
