import { get } from "./api.js"

const endpoints = {
    'teams': '/data/teams',
    'members': '/data/members?where=status%3D%22member%22',
    'specificMembers': (teamId) => `/data/members?where=${encodeURIComponent(`teamId IN ("${teamId}") AND status="member"`)}`,
    'team': (id) => `/data/teams/${id}`
}


export async function getAllTeams () {

    const teams = await get(endpoints.teams);
    return teams

}

export async function getAllMembers () {

    const members = await get(endpoints.members);
    return members;

}


export async function getMembersFromTeam (teamID) {

    const specificMemers = await get(endpoints.specificMembers(teamID))
    return specificMemers

}

export async function getTeamInfo(someId) {

    const teamInfo = await get(endpoints.team(someId))
    return teamInfo

}