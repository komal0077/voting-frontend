import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class Vote {

  private baseUrl = environment.apiUrl;

  private candidateUrl = `${this.baseUrl}/api/candidates`;
  private voterUrl = `${this.baseUrl}/api/voters`;
  private voteUrl = `${this.baseUrl}/api/vote`;
  private partyUrl = `${this.baseUrl}/api/parties`;
  private historyUrl = `${this.baseUrl}/api/history`;

  constructor(private http: HttpClient) {}

  addCandidate(candidate: any): Observable<any> {
    return this.http.post(this.candidateUrl, candidate);
  }

  addVoter(voter: any): Observable<any> {
    return this.http.post(this.voterUrl, voter);
  }

  getCandidates(): Observable<any[]> {
    return this.http.get<any[]>(this.candidateUrl);
  }

  getVoters(): Observable<any[]> {
    return this.http.get<any[]>(this.voterUrl);
  }

  castVote(voterId: number, candidateId: number): Observable<string> {
    return this.http.post(
      this.voteUrl,
      { voterId, candidateId },
      { responseType: 'text' }
    );
  }

  getWinner(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/results/winner`);
  }

  getCandidateResults(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/results/candidates`);
  }

  getPartyResults(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/results/parties`);
  }

  addParty(party: any): Observable<any> {
    return this.http.post(this.partyUrl, party);
  }

  getParties(): Observable<any[]> {
    return this.http.get<any[]>(this.partyUrl);
  }

  deleteCandidate(id: number): Observable<string> {
    return this.http.delete(`${this.candidateUrl}/${id}`, {
      responseType: 'text'
    });
  }

  saveHistory(year: string, state: string): Observable<string> {
    return this.http.post(
      `${this.historyUrl}/save?year=${year}&state=${state}`,
      {},
      { responseType: 'text' }
    );
  }

  getHistory(): Observable<any[]> {
    return this.http.get<any[]>(this.historyUrl);
  }

  deleteHistory(id: number): Observable<string> {
    return this.http.delete(`${this.historyUrl}/delete/${id}`, {
      responseType: 'text'
    });
  }

  deleteParty(id: number): Observable<string> {
    return this.http.delete(`${this.partyUrl}/${id}`, {
      responseType: 'text'
    });
  }

  deleteVoter(id: number): Observable<string> {
    return this.http.delete(`${this.voterUrl}/${id}`, {
      responseType: 'text'
    });
  }
}
