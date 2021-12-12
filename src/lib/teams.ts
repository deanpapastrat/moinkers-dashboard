import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

interface Teams {
  team1: Team,
  team2: Team,
}

export interface Team {
  name: string,
  people: string[]
}

export enum TeamId {
  team1 = 'team1',
  team2 = 'team2'
}

export const teams: Writable<Teams> = writable({
  team1: {
    name: 'Team A',
    people: [],
  },
  team2: {
    name: 'Team B',
    people: [],
  }
});

export function addPerson(newName: string) {
  teams.update(teams => {
    if (teams.team1.people.length < teams.team2.people.length) {
      teams.team1.people.push(newName);
    } else {
      teams.team2.people.push(newName);
    }
    return teams;
  });
}

export function removePerson(teamId: TeamId, index: number) {
  teams.update(teams => {
    teams[teamId].people.splice(index, 1);
    return teams;
  });
}

export function randomizeTeams() {
  teams.update(teams => {
    const unorderedPeople = teams.team1.people.concat(teams.team2.people);
    const orderedPeople: [number, string][] = unorderedPeople.map(
      person => [Math.random(), person]
    );
    orderedPeople.sort(
      (a, b) => a[0] - b[0]
    )
    const midwayPoint = orderedPeople.length / 2;
    teams.team1.people = orderedPeople.splice(0, midwayPoint).map(person => person[1]);
    teams.team2.people = orderedPeople.map(person => person[1]);
    return teams;
  });
}
