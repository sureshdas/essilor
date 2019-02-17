import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, HostListener } from '@angular/core';
import { SharedApiService } from '@app/shared/shared-api.service';
import { Observable, fromEvent, Subject } from 'rxjs';
import { debounceTime, map, filter } from 'rxjs/operators';
import { SharedService } from '@app/shared/shared.service';

@Component({
  selector: 'app-dynamic-component',
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.scss']
})
export class DynamicComponentComponent implements OnInit, AfterViewInit {
  @Input() details: any;
  @Input() componentDb: any; // the database of the current component.
  @Input() dataModel: any; // the data model for the form
  // emits an event for every change in a dropdown.
  @Output() dropdownChange: EventEmitter<any> = new EventEmitter();
  showSearch = false; // show search dropdown
  dropdownOptions: any = []; // stores the dropdown options
  listData: any = [];
  mediaData: any = [];
  searchResults: any = [];
  selectedSearch: any = [];
  searchItems: any;
  serverIp = 'http://172.104.190.30/piich/';

  constructor(private sharedApi: SharedApiService, private sharedService: SharedService) { }

  ngOnInit() {
    if (this.details.type === 'list') {
      this.sharedService.command.subscribe(
        (toReload) => {
          if (toReload === 'LIST') {
            console.log('reload? ::', toReload);
            this.getDataForList();
          }
        });
    }
    // this.searchResults = [
    //   { result: 'abcc df' },
    //   { result: 'abcc df' },
    //   { result: 'abcc df' },
    //   { result: 'abcc df' },
    //   { result: 'abcc df' },
    //   { result: 'abcc df' },
    //   { result: 'abcc df' },
    //   { result: 'abcc df' },
    //   { result: 'abcc df' },
    //   { result: 'abcc df' },
    //   { result: 'abcc df' },
    //   { result: 'abcc df' },
    //   { result: 'abcc df' },
    //   { result: 'abcc df' },
    //   { result: 'abcc df' },
    //   { result: 'abcc df' },
    //   { result: 'abcc df' },
    // ];
    // this.mediaData = [
    //   { url: 'https://via.placeholder.com/75x75' },
    //   { url: 'https://via.placeholder.com/75x75' },
    //   { url: 'https://via.placeholder.com/75x75' },
    //   { url: 'https://via.placeholder.com/75x75' },
    //   { url: 'https://via.placeholder.com/75x75' },
    //   { url: 'https://via.placeholder.com/75x75' },
    //   { url: 'https://via.placeholder.com/75x75' },
    //   { url: 'https://via.placeholder.com/75x75' },
    //   { url: 'https://via.placeholder.com/75x75' },
    //   { url: 'https://via.placeholder.com/75x75' },
    //   { url: 'https://via.placeholder.com/75x75' },
    //   { url: 'https://via.placeholder.com/75x75' },
    //   { url: 'https://via.placeholder.com/75x75' },
    //   { url: 'https://via.placeholder.com/75x75' },
    //   { url: 'https://via.placeholder.com/75x75' },
    //   { url: 'https://via.placeholder.com/75x75' },
    //   { url: 'https://via.placeholder.com/75x75' },
    // ];
    // this.listData = [
    //   { name: 'sdfsdfdsf' },
    //   { name: 'sdfsdfdsf' },
    //   { name: 'sdfsdfdsf' },
    //   { name: 'sdfsdfdsf' },
    //   { name: 'sdfsdfdsf' },
    //   { name: 'sdfsdfdsf' },
    //   { name: 'sdfsdfdsf' },
    //   { name: 'sdfsdfdsf' },
    //   { name: 'sdfsdfdsf' },
    //   { name: 'sdfsdfdsf' },
    //   { name: 'sdfsdfdsf' },
    //   { name: 'sdfsdfdsf' },
    //   { name: 'sdfsdfdsf' },
    //   { name: 'sdfsdfdsf' },
    //   { name: 'sdfsdfdsf' },
    //   { name: 'sdfsdfdsf' },
    //   { name: 'sdfsdfdsf' },
    //   { name: 'sdfsdfdsf' },
    //   { name: 'sdfsdfdsf' },
    // ];
  }

  ngAfterViewInit() {
    if (this.details.type === 'list') {
      // this.getDataForList(this.details.data.reference_api);
      this.getDataForList();
    } else if (this.details.type === 'search') {
      const search = fromEvent(document.getElementById('searchTerm'), 'keyup');
      search
        .pipe(
          debounceTime(1000),
          map((event: any) => event.target.value),
          filter(input => input.length > 0)
        )
        .subscribe((s: string) => {
          // console.log('search string :: ' + s);
          this.sharedApi.getDataForSearch(
            this.details.event_data.reference_api[0].api,
            { search: s },
            this.details.event_data.reference_api[0].page_activity
          )
            .subscribe((searchResults: any) => {
              this.showSearch = true;
              // console.log(searchResults);
              searchResults.forEach((el: any) => {
                el['checked'] = false;
              });
              this.searchResults = searchResults;
            });
        });
    } else if (this.details.type === 'media') {
      this.downloadMedia();
    }
  }
  downloadMedia() {
    const url = this.details.reference_api.api;
    const activityCode = this.details.reference_api.page_activity;
    const key = this.details.reference_api.parameters.key;
    let params = {};
    params[key] = this.componentDb.pageId;
    this.sharedApi.ajaxRequestGet(
      url,
      activityCode,
      params
    )
      .subscribe((response: any) => {
        this.mediaData = response;
      });
  }

  onDrop(e: any) {
    e.preventDefault();
    // console.log('drop event', e);
    // console.log('files', e.dataTransfer.items);
  }

  getDataForList() {
    const referenceApi = this.details.data.reference_api[0];
    const params = {};
    let url = `${referenceApi.api}&${referenceApi.parameters.key}='${this.componentDb['pageId']}'`;
    this.sharedApi.getDataForList(url, params)
      .subscribe((result: any) => {
        this.listData = this.parseDataList(result);
        console.log('list data FORMATTED', this.listData);
      });
  }

  deleteListItem(id: any) {
    this.sharedApi.deleteData(`${this.details.data.delete_api}/${id}`, this.details.data.reference_api[0].api)
      .subscribe((res: any) => {
        this.getDataForList();
      });
  }

  parseDataList(data: any) {
    let result: any = [];
    data.forEach((el: any) => {
      const obj = {};
      obj['name'] = el.name;
      // obj['id'] = el.fields[0].fieldId;
      obj['mappedId'] = el._id; // delete the company from the selected region
      result.push(obj);
    });
    return result;
  }
  // hide the search results
  toggleDisplay(value: any) {
    // console.log(value);
    this.showSearch = false;
    this.filterCheckList();
    // console.log(this.selectedSearch);
    this.searchItems = '';
    this.selectedSearch.map((el: any) => {
      // this.searchItems.push(el.name);
      this.searchItems += el.name + ', ';
    });
  }
  // called when a dropdown is clicked
  dropdownClick(value: any) { }

  cCheckbox(data: any, index: any) {
    // console.log('->>', data);
    this.searchResults[index]['checked'] = !this.searchResults[index]['checked'];
    this.filterCheckList();
  }

  filterCheckList() {
    this.selectedSearch = this.searchResults.filter((el: any) => el.checked);
    // console.log(this.selectedSearch);
    this.componentDb['search'] = this.selectedSearch;
  }

  buttonClick(e: any) {
    e.preventDefault();
    // let requestData: any = [];
    const url = this.details.reference_api.api;
    const activityCode = this.details.reference_api.page_activity;
    const dataFormat = this.details.reference_api.data_format;
    const data = this.componentDb['search'];
    let length = parseInt(data.length, 10);
    data.forEach((el: any, index: any) => {
      // console.log('indexxx', index);
      let obj = dataFormat;
      obj['name'] = el.name;
      obj['parentLocationInMaster'] = this.componentDb['pageId'];
      obj['fields'][0]['value'] = el._id;

      // requestData.push(obj);
      this.sharedApi.postData(url, activityCode, obj)
        .subscribe((res: any) => {
          // console.log('added');
          if (parseInt(index, 10) === length - 1) {
            this.sharedService.sendSharedData('LIST');
          }
        });
    });
    // console.log(requestData);
  }

  uploadMedia($event: any, actionType: string = 'UPLOAD') {
    console.log($event);
    if (
      ($event.target.files && $event.target.files[0]) ||
      ($event.dataTransfer.files && $event.dataTransfer.files[0])
    ) {
      const mediaFile = actionType === 'DROP' ? $event.dataTransfer.files[0] : $event.target.files[0];
      let mediaType = actionType === 'DROP' ? $event.dataTransfer.files[0].type : $event.target.files[0].type;
      mediaType = mediaType.split('/')[0];
      // console.log(mediaType);

      const formData = new FormData();
      formData.append('media', mediaFile, mediaFile.name);
      formData.append(this.details.reference_api.parameters.key, this.componentDb.pageId);
      let url;
      if (mediaType === 'image') {
        url = this.details.upload_button.reference_api.api.image;
      } else if (mediaType === 'video') {
        url = this.details.upload_button.reference_api.api.video;
      } else if (mediaType === 'application') {
        url = this.details.upload_button.reference_api.api.document;
      }
      const pageActivity = this.details.upload_button.reference_api.page_activity;
      this.sharedApi.postData(url, pageActivity, formData)
        .subscribe((response: any) => {
          this.downloadMedia();
        });
    }
  }

  deleteMedia(id: string) {
    const url = this.details.delete_api + id;
    const pageActivity = 'MEDIA';
    this.sharedApi.deleteData(url, pageActivity)
      .subscribe((res: any) => {
        this.downloadMedia();
      });
  }

  onSearchFocus() {
    // console.log('search focus');
    this.showSearch = this.searchResults.length > 0 ? true : false;
  }

  showPreview(url: string, type: string) {
    // console.log('preview');
    // this.sharedService.showDialog({ url, mediaType, type: 'PREVIEW' }, '90%', '90%');
    this.sharedService.previewMedia({ url, type });
  }
}
