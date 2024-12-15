import axios from "../../axios";
import router from '../../router';

export default {
    namespaced: true,
    state: () => ({
        accessToken: localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : '',
        authFlg: localStorage.getItem('accessToken') ? true : false,
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {},
    }),
    mutations: {
        setAuthFlg(state, flg) {
            state.authFlg = flg;
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        setAccessToken(state, accessToken) {
            state.accessToken = accessToken;
            localStorage.setItem('accessToken', accessToken);
        }
    },
    actions: {
        /**
         * 로그인
         * 
         * @param {*}   context
         * @param {*}   userInfo
         */
        login(context, userInfo) {
            const url = '/api/login';
            const data = JSON.stringify(userInfo);

            // console.log(userInfo,data);

            
            axios.post(url, data)
            .then(response => {

                // 토큰 저장
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                localStorage.setItem('userInfo', JSON.stringify(response.data.data));
                context.commit('setAuthFlg', true);
                context.commit('setUserInfo', response.data.data);

                alert('어서와 처음이지');

                router.replace('/');
            })
            .catch(error => {
                let errorMsgList = [];
                const errorData = error.response.data;

                if(error.response.status === 422) {
                    // 유효성 체크 에러
                    if(errorData.data.email) {
                        errorMsgList.push(errorData.data.email[0]);
                    }
                    if(errorData.data.password) {
                        errorMsgList.push(errorData.data.password[0]);
                    }
                } else if(error.response.status === 401) {
                    // 비밀번호 오류
                    errorMsgList.push(errorData.msg);
                } else {
                    errorMsgList.push('예기치 못한 오류 발생');
                }
                console.log(error);
                alert(errorMsgList.join('\n'));

                // console.log(error);
            });
        },

        /**
         * 로그아웃
         */
        logout(context, userInfo) {
            const url = '/api/logout';
            const config = {
                headers: {
                    // content-type은 axios 불러와서 생략
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                } // bearer token 세팅
            }

            axios.post(url, null, config)
            .then(response => {
                alert('로그아웃 완료');
            })
            .catch(error => {
                alert('문제가 발생하여 로그아웃 처리');
            })
            .finally(() => {
                localStorage.clear();
    
                // state 초기화
                context.commit('setAuthFlg', false);
                context.commit('setUserInfo', {});
    
                router.replace('/');
            });
        },
    },
    getters: {

    },
}