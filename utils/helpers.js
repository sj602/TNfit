import { Dimensions } from 'react-native';

export const width = Dimensions.get('window').width; //full width
export const height = Dimensions.get('window').height; //full height

export function deepCopy(obj) {
	if(typeof obj === 'object') {
		return Object.keys(obj)
	   				.map(k => ({ [k]: deepCopy(obj[k]) }))
	    			.reduce((a, c) => Object.assign(a, c), {});
	} else if(Array.isArray(obj)) {
		return obj.map(deepCopy)
	}
	return obj;
}

export const emailDB = (email) => {
	console.log('email', email)
	email = email.split("@");
    email[1] = email[1].replace(/[.]/g, '-');
    email = email.join("@");

    return email;
}

export const emailNormal = (email) => {
	email = email.split("@");
    email[1] = email[1].replace(/[-]/g, '.');
    email = email.join("@");

    return email;
}