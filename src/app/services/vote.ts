




import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Vote {

  private candidateUrl = 'http://localhost:8080/api/candidates';
  private voterUrl = 'http://localhost:8080/api/voters';
  private voteUrl = 'http://localhost:8080/api/vote';
  private partyUrl = 'http://localhost:8080/api/parties';
  private historyUrl = 'http://localhost:8080/api/history';

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
    return this.http.get("http://localhost:8080/api/results/winner");
  }

  getCandidateResults(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:8080/api/results/candidates");
  }

  getPartyResults(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:8080/api/results/parties");
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

  // ==========================
  // ✔✔ HISTORY ENDPOINTS
  // ==========================

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
