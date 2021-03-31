import * as api from './api.js';

let host = 'http://localhost:3030'
api.settings.host = host;

export let login = api.login;
export let register = api.register;
export let logout = api.logout;

export async function getAllItems() {
    let teams = await api.get(host + '/data/teams');
    let members = await getMembers(teams.map(t => t._id));
    return teams;
}

export async function getMyTeams() {
    let userId = sessionStorage.getItem('userId')
    let teamsCreated = await api.get(host + `/data/members?where=_ownerId%3D%22${userId}%22`);
    let teamsMember = await api.get(host + `/data/members?where=_ownerId%3D%22${userId}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`);
    let teams = teamsCreated.concat(teamsMember.map(r => r.team))
    return teams;
}

export async function getAllMembers() {
    return await api.get(host + '/data/members?where=status%3D%22member%22')
}

export async function getTeamById(id) {
    return await api.get(host + '/data/teams/' + id)
}

export async function createItem(body) {
    return await api.post(host + '/data/teams', body)
}

export async function updateItem(id, body) {
    return await api.put(host + '/data/teams/' + id, body)
}

export async function deleteItem(id) {
    return await api.del(host + '/data/teams/' + id)
}

export async function getRequestsTeamId(teamId) {
    return await api.get(host + `/data/members?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`);
}

export async function getMembers(teamIds) {
    let query = encodeURIComponent(`teamId IN ("${teamIds.join('", "')}") AND status="member"`)
    return await api.get(host + `/data/members?where=${query}`);
}

export async function sendRequest(teamId) {
    let body = { teamId: teamId }
    return await api.post(host + '/data/members', body)
}

export async function cancelMembership(requestId) {
    return await api.del(host + '/data/members/' + requestId)
}

export async function approveMembership(request) {
    let body = {
        teamId: request.teamId,
        status: 'member'
    }
    return await api.put(host + '/data/members/' + request._id, body)
}