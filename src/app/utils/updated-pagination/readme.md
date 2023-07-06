
This is a generic pagination component using ngx-bootstrap/pagination library,
and can be used by inserting in HTML diretcly as its part of shared module imports.

----------------------------------------------------------------------------------------

You would need the following configuration in respective files:

# HTML_FILE: use the selector in the following pattern

   <app-updated-pagination 
    [showBoundaryLinks] = Boolean - shows First & Last buttons- defaults to TRUE - OPTIONAL
    [showDirectionLinks] = Boolean - shows Previous & Next buttons- defaults to TRUE - OPTIONAL
    [totalItems] = Number - API count variable from typescript file - REQUIRED
    [page] = Number - Current page Index - defaults to 0 - Initalization REQUIRED in TS file
    [pageSize] = Number - Number of items in each page - defaults to 5 - Initalization REQUIRED in TS file
    [tableSizes] = Array - Dropdown to change pageSize - defaults [5, 10, 15, 20, 50, 100] - OPTIONAL
    [maxSize] = Number - defaults to 5 - OPTIONAL
    [rotate] = Boolean - defaults to true - OPTIONAL
    (sendDatatoParent)="getPaginationData($event)" - REQUIRED Method in TS file
    >
     </app-updated-pagination>

-----------------------------------------------------------------------------------------

# TypeScript_FILE : initialize variables and data - !IMPORTANT

    this.page = Number - append it to Get API call url in typescript 
    this.pageSize = Number - append it to Get API call url in typescript

    --> Method to update page and pageSize:
     
    getPaginationData(data: any) {       
    this.page = data.page;              // bound to pagination component method
    this.pageSize = data.pageSize;      
    //YOUR METHOD TO FETCH DATA goes here which shall use updated page & pageSize values
  }

# CAVEATS :
   Make sure API returns valid count variable
   It is recommended to even pass optional parameters to selector
   

@authored by : Eswar Prasad Kona 
Reach out to: eswarprasadk@turito.com 

happy programming :) 

