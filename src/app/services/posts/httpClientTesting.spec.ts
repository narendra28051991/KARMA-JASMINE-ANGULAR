import { HttpClient } from "@angular/common/http"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { TestBed } from "@angular/core/testing"

interface Data {
    name: string
}

let url = '/data'

describe('httpClient', () => {
    let httpClient: HttpClient
    let httpTestingController: HttpTestingController

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        })
        
        httpClient = TestBed.inject(HttpClient)
        httpTestingController = TestBed.inject(HttpTestingController)
    })

    it('should call the url using get', () => {
        const testData: Data = { name: 'httpClientTesting' }
        httpClient.get<Data>(url).subscribe(data => {
            expect(data).toEqual(testData)
        })

        const request = httpTestingController.expectOne(url)
        request.flush(testData)
        expect(request.request.method).toBe('GET')
    })

    it('should call multiple urls using get', () => {
        const testData: Data[] = [{ name: 'Mario' }, { name: 'Yoshi' }, { name: 'Luigi' }]
        
        httpClient.get<Data[]>(url).subscribe(data => {
            expect(data.length).toEqual(0)
        })
        httpClient.get<Data[]>(url).subscribe(data => {
            expect(data).toEqual([testData[0]])
        })
        httpClient.get<Data[]>(url).subscribe(data => {
            expect(data).toEqual(testData)
        })

        const requests = httpTestingController.match(url)
        expect(requests.length).toEqual(3)

        requests[0].flush([])
        requests[1].flush([testData[0]])
        requests[2].flush(testData)
    })
})