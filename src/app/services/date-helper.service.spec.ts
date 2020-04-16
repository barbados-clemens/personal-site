import {DateHelperService} from './date-helper.service';

describe('DateHelperService', () => {
  let service: DateHelperService;

  beforeEach(() => {
    service = new DateHelperService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should parse date to MM YYYY', () => {
    expect(service.parseDateToTitle('2020-02-21')).toEqual('February 2020');
  });
});
