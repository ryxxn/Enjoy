import { Timestamp } from "firebase/firestore";
interface WrongTimestamp {
    seconds: number
    nanoseconds: number
}
class WrongTimestamp {
    seconds: number
    nanoseconds: number
    constructor(seconds: number, nanoseconds: number) {
        this.nanoseconds = nanoseconds;
        this.seconds = seconds
    }
}

export const isUuidPattern = (input: string) => {

    const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

    return uuidPattern.test(input);
}


/** 깊은 복사 함수 */
export const deepcopy = (object: any) => {
    if (object === null || typeof object !== "object") {
        return object;
    }
    // 객체인지 배열인지 판단
    const copy: any = Array.isArray(object) ? [] : {};

    for (let key of Object.keys(object)) {
        copy[key] = deepcopy(object[key]);
    }

    return copy;
}


/** 로컬스토리지 사용 함수*/
export const getLocalData = (DBName: string): any => {
    const data = localStorage.getItem(DBName);
    if (data) {
        return JSON.parse(data);
    }
    return null; // 또는 다른 처리 방식으로 대체 가능
};

export const setLocalData = (DBName: string, storage: any) => {
    localStorage.setItem(DBName, JSON.stringify(storage));
}

export const timestampToDate = (timestamp: Timestamp | WrongTimestamp | Date | any) => {
    if (timestamp instanceof Timestamp) {
        return timestamp.toDate();
    } else if (timestamp instanceof Object && timestamp instanceof WrongTimestamp) {
        return new Date(timestamp.seconds * 1000)
    } else if (typeof timestamp === 'object' && timestamp instanceof Date) {
        return timestamp;
    } else {
        console.error(timestamp);
        // throw new Error('시간 정보가 잘 못 입력되었습니다.')
    }
}

/* 에러 처리 함수 */
export const errorHandling = (error: any) => {
    const errorCode = error.response.status;

    console.log(errorCode)
    if (errorCode === 400) {
        alert("요청 형식이 올바르지 않습니다.");
    }
    // 정보가 없을 때 (404)
    if (errorCode === 404) {
        alert("페이지가 존재하지 않습니다.")
        window.history.back();
    }
    // 인증 정보가 맞지 않을 때 (401)
    else if (errorCode === 401) {
        window.alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
        // window.history.pushState({isLogin: false}, "로그인", "./login");
        window.location.href = '/login';
    }
    // 토큰이 만료됐을 때
    else if (errorCode === 403) {
        window.alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
        // window.history.pushState({isLogin:false}, "로그인", "./login");
        window.location.href = '/login';
    }
    // 서버 에러일 때
    else if (errorCode === 500) {
        console.error("서버 에러")
    }
    // 기타 에러일 떄
    else {
        console.error("알 수 없는 에러")
    }
}
