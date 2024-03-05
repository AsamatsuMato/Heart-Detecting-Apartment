import request from './request.js';

export function putToCache(data: any) {
	return request('peis/reg/person/putToCache', 'POST', data);
}

export function queryPersonTeamRegList(data: any) {
	return request('peis/reg/team/queryPersonTeamRegList', 'POST', data);
}

export function getFromCache(data: any) {
	return request('peis/reg/person/getFromCache', 'POST', data);
}