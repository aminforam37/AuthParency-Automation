import { test, expect } from '@playwright/test';
import { addResult, getResults } from '../resultsCollector'; 

let srNo = 1;
//let testResults: {srNo: any, module: any, status: any, URL: any }[] = [];
let status = 'Fail';

const successMessageSelector = 'Login : Successfully Login'; 
const errorMessageSelector = 'Login : Login failed'; 


test.beforeEach('Login', async ({ page })=> {

  //await page.goto('https://qalogin.authparency.com/'); 
  await page.goto('https://demo.authparency.com/');
    
   console.log("\x1b[1mLogin:\x1b[0m");
   console.log("🔐 Starting Login Module Tests...");

    const Email = "foram.amin@outamation.com";
    const Password = "Pramukh@108";
  
    await page.locator('input[type="email"]').click();
    await page.locator('input[type="email"]').fill(Email);
    await page.waitForTimeout(1000);
    await page.locator('[type="submit"]').click();
    await page.waitForTimeout(1000);
    await page.locator('input[name="passwd"]').click();
    await page.getByPlaceholder("Password").fill(Password);
    await page.waitForTimeout(1000);
    await page.locator('[type="submit"]').click();
    await page.getByRole('button', { name: "Yes" }).click();
    await page.waitForTimeout(1000); 
     if (successMessageSelector) {
        console.log("✅ User logged in Successfully.");
        await page.waitForTimeout(1500); 
    } else if (errorMessageSelector) {
        console.log("❌ User login failed.");
        await page.waitForTimeout(1500); 
    } else {
        console.log('Login status unknown: No success or error message displayed.');
        await page.waitForTimeout(1500); 
    }

});

test('@Authparency: Dashboard Received ', async ({ page }) => {



    // //Env
    // await page.waitForSelector('body > div > main > div > div:nth-child(2) > a > div > div');
    // await page.waitForTimeout(1000);  
    // await page.locator('body > div > main > div > div:nth-child(2) > a > div > div').click();
    // await page.waitForTimeout(1000);  
    // await page.locator('a[href="https://demo.authparency.com/microsoftidentity/account/signin?p=DefaultPractice"]').click();

    await page.locator('button[class="btn btn-default"]').click(); //Popup Box
    
    //Received Dashboard 
    console.log("");
    console.log("\x1b[1m1.Received Counts:\x1b[0m");
    // console.log('1.Received Counts!!');
    const dashboardCountText = await page.locator('span[id="receivedcount"]').innerText();
    console.log('Dashboard Count:', dashboardCountText);
    await page.waitForTimeout(3000);

    //Order Page
    await page.locator('[href="/orders"]').click();
    await page.waitForTimeout(1500);  

    const gridcount = await page.locator('span[data-ref="lbRecordCount"]').innerText();
    await page.waitForTimeout(3000);
    console.log('Grid Count:', gridcount);
    await page.waitForTimeout(1000);

    const dashboardNormalized = dashboardCountText.replace(/,/g, '').trim();
    const gridNormalized = gridcount.replace(/,/g, '').trim();

        if (dashboardNormalized === gridNormalized) {
        console.log('✅ The counts match!');
        } else {
        console.log(`❌ The counts do not match. Dashboard: ${dashboardNormalized}, Grid: ${gridNormalized}`);
        }

     //Back to Dashborad
     await page.locator('a[href="/dashboard"]').nth(1).click();
     await page.waitForTimeout(1500);
     await page.locator('button[class="btn btn-default"]').click(); //popbox


    //No action needed DB
   const NoactionDB =  await page.locator('span[id="NoActionCount"]').innerText();
   await page.waitForTimeout(3000);
   console.log('No Action Needed DB Count:', NoactionDB);
   await page.waitForTimeout(1000);

   //Order Page
   await page.locator('[href="/orders"]').click();
   await page.waitForTimeout(1500);  

    await page.locator('button[aria-label="Open Filter Menu"]').nth(5).click();
    await page.waitForTimeout(1000);
    await page.locator('div[class="ag-input-field-label ag-label ag-checkbox-label ag-label-ellipsis"]').nth(0).click();
    await page.waitForTimeout(1000);
    await page.locator('input[type="checkbox"]').nth(0).uncheck();
    await page.waitForTimeout(1000);

   await page.locator('input[aria-label="Search filter values"]').pressSequentially('No Action Needed', { delay: 100 });
   await page.waitForTimeout(1500);
   await page.locator('div[class="ag-input-field-label ag-label ag-checkbox-label ag-label-ellipsis"]').nth(1).click();
   await page.waitForTimeout(1500);
   await page.locator('button[type="submit"]').click();
   await page.waitForTimeout(1500);

   const gridNPN = await page.locator('span[data-ref="lbRecordCount"]').innerText();
   await page.waitForTimeout(3000);
   console.log('Grid No Action Needed Count:', gridNPN);
   await page.waitForTimeout(3000);

   if (NoactionDB === gridNPN) {
       console.log('✅ The No Action Needed counts match!');
   } else {
       console.log(`❌ The No Action Needed counts do not match. Dashboard: ${NoactionDB}, Grid: ${gridNPN}`);
   }
   await page.waitForTimeout(1500);

    //Back to Dashborad
    await page.locator('a[href="/dashboard"]').nth(1).click();
    await page.waitForTimeout(1500);
    await page.locator('button[class="btn btn-default"]').click(); //popbox

    //2.No PA Required Counts
    console.log("");
    console.log("\x1b[1m2.No PA Required Counts:\x1b[0m");
    

    await page.waitForSelector('span[id="noparequiredCount"]');  // Wait for the element to be available
    const dashboardCountNPA = await page.locator('span[id="noparequiredCount"]').innerText();
    console.log('Dashboard Count:', dashboardCountNPA);
    await page.waitForTimeout(3000);
   
     // Grid count NPA
     await page.locator('span[id="noparequiredCount"]').click();
     await page.waitForTimeout(3000);
     
     await page.waitForSelector('span[data-ref="lbRecordCount"]');
     await page.waitForTimeout(3000);
     const gridcountNPA = await page.locator('span[data-ref="lbRecordCount"]').innerText();
     await page.waitForTimeout(3000);
     console.log('Grid Count:', gridcountNPA);
     await page.waitForTimeout(3000);
 
     if (dashboardCountNPA === gridcountNPA) {
         console.log('✅ The counts match!');
     } else {
         console.log(`❌ The counts do not match. Dashboard: ${dashboardCountNPA}, Grid: ${gridcountNPA}`);
     }
     await page.waitForTimeout(1500);


   //Submitted Dashboard
    console.log("");
    console.log("\x1b[1m3.Submitted Counts:\x1b[0m"); 
   
    //Back to Dashborad
    await page.locator('a[href="/dashboard"]').nth(1).click();
    await page.waitForTimeout(1500);
    await page.locator('button[class="btn btn-default"]').click(); //popbox
    const dashboardCountSubmitted = await page.locator('span[id="submittedcount"]').innerText();
    console.log('Dashboard Submitted Count:', dashboardCountSubmitted);
    await page.waitForTimeout(1500);

    //Dashboard page Submitted
    await page.locator('span[id="submittedcount"]').click();
    await page.waitForTimeout(1500);
   

//    //Grid Outcome
//     await page.locator('button[aria-label="Open Filter Menu"]').nth(6).click();    //Search 
//     await page.waitForTimeout(1000);
//     await page.locator('div[class="ag-input-field-label ag-label ag-checkbox-label ag-label-ellipsis"]').nth(0).click();    //Search values
//     await page.waitForTimeout(1000);
//     await page.locator('input[type="checkbox"]').nth(0).uncheck();  //Unchecked all values
//     await page.waitForTimeout(1000);
//    // await page.locator('input[aria-label="Search filter values"]').fill('Denied');
//     await page.locator('input[aria-label="Search filter values"]').pressSequentially('Denied', { delay: 100 });
//     await page.waitForTimeout(3000);
//     await page.locator('div[class="ag-input-field-label ag-label ag-checkbox-label ag-label-ellipsis"]').nth(3).click();
//     await page.waitForTimeout(1000);
//     await page.locator('button[type="submit"]').click();
//     await page.waitForTimeout(4000);
//     await page.locator('button[aria-label="Open Filter Menu"]').nth(6).click();    //Search 
//     await page.waitForTimeout(1000);
//     await page.locator('input[aria-label="Search filter values"]').clear();
//     // await page.locator('div[class="ag-input-field-label ag-label ag-checkbox-label ag-label-ellipsis"]').nth(0).click();    //Search values
//     // await page.waitForTimeout(1000);
//     // await page.locator('input[type="checkbox"]').nth(0).uncheck();
//     await page.waitForTimeout(1000);
//     await page.locator('input[aria-label="Search filter values"]').pressSequentially('InProgress', { delay: 100 });
//     await page.waitForTimeout(3000);
//     await page.locator('div[class="ag-input-field-label ag-label ag-checkbox-label ag-label-ellipsis"]').nth(1).click();
//     await page.waitForTimeout(3000);
//     await page.locator('button[type="submit"]').click();
//     await page.waitForTimeout(3000);

//     //Grid Status 
//     await page.locator('button[aria-label="Open Filter Menu"]').nth(5).click();    //Search 
//     await page.waitForTimeout(1000);
//     await page.locator('div[class="ag-input-field-label ag-label ag-checkbox-label ag-label-ellipsis"]').nth(0).click();    //Search values
//     await page.waitForTimeout(1000);
//     await page.locator('input[type="checkbox"]').nth(0).uncheck();
//     await page.waitForTimeout(1000);
//     await page.locator('input[aria-label="Search filter values"]').pressSequentially('Additional Documents Required', { delay: 100 });
//     await page.waitForTimeout(3000);
//     await page.locator('div[class="ag-input-field-label ag-label ag-checkbox-label ag-label-ellipsis"]').nth(1).click();
//     await page.waitForTimeout(1500);
//     await page.locator('button[type="submit"]').click();
//     await page.locator('button[aria-label="Open Filter Menu"]').nth(5).click();    //Search 
//     await page.waitForTimeout(1000);
//     await page.locator('input[aria-label="Search filter values"]').clear();
//     await page.waitForTimeout(1000);
//     await page.locator('input[aria-label="Search filter values"]').pressSequentially('Appealed 1 Peer To Peer Review', { delay: 100 });
//     await page.waitForTimeout(3000);
//     await page.locator('div[class="ag-input-field-label ag-label ag-checkbox-label ag-label-ellipsis"]').nth(1).click();
//     await page.locator('button[type="submit"]').click();
//     await page.waitForTimeout(1500);
//     await page.locator('button[aria-label="Open Filter Menu"]').nth(5).click();    //Search 
//     await page.waitForTimeout(1000);
//     await page.locator('input[aria-label="Search filter values"]').clear();
  
//     await page.locator('input[aria-label="Search filter values"]').pressSequentially('PA Submitted', { delay: 100 });
//     await page.waitForTimeout(3000);
//     await page.locator('div[class="ag-input-field-label ag-label ag-checkbox-label ag-label-ellipsis"]').nth(1).click();
//     await page.waitForTimeout(3000);
//     await page.locator('button[type="submit"]').click();
//     await page.waitForTimeout(3000);
//     await page.locator('button[aria-label="Open Filter Menu"]').nth(5).click();    //Search 
//     await page.waitForTimeout(1000);
//     await page.locator('input[aria-label="Search filter values"]').clear();
//     await page.waitForTimeout(1000);
//     await page.locator('input[aria-label="Search filter values"]').pressSequentially('PeerToPeer Review', { delay: 100 });
//     await page.waitForTimeout(3000);
//     await page.locator('div[class="ag-input-field-label ag-label ag-checkbox-label ag-label-ellipsis"]').nth(1).click();
//     await page.waitForTimeout(3000);
//     await page.locator('button[type="submit"]').click();
//     await page.waitForTimeout(3000);


    const gridcountSubmitted = await page.locator('span[data-ref="lbRecordCount"]').innerText();
    await page.waitForTimeout(3000);
    console.log('Grid Submitted Count:', gridcountSubmitted);
    await page.waitForTimeout(3000);

    if (dashboardCountSubmitted === gridcountSubmitted) {
        console.log('✅ The Submitted counts match!');
    } else {
        console.log(`❌ The Submitted counts do not match. Dashboard: ${dashboardCountSubmitted}, Grid: ${gridcountSubmitted}`);
    }
    await page.waitForTimeout(1500);

    //Back to Dashborad
    await page.locator('a[href="/dashboard"]').nth(1).click();
    await page.waitForTimeout(3000);
    await page.locator('button[class="btn btn-default"]').click(); //popbox

    //Appealed DB
    const AppealedDB = await page.locator('span[id="SubAppealedcount"]').innerText();
   await page.waitForTimeout(1500);
   console.log('Appealed DB Count:', AppealedDB);
   await page.waitForTimeout(1000);

   //Dashboard page Submitted
   await page.locator('span[id="submittedcount"]').click();
   await page.waitForTimeout(1500);  

    await page.locator('button[aria-label="Open Filter Menu"]').nth(5).click();
    await page.waitForTimeout(1000);
    await page.locator('div[class="ag-input-field-label ag-label ag-checkbox-label ag-label-ellipsis"]').nth(0).click();
    await page.waitForTimeout(1000);
    await page.locator('input[type="checkbox"]').nth(0).uncheck();
    await page.waitForTimeout(1000);

   await page.locator('input[aria-label="Search filter values"]').pressSequentially('Appeal Peer To Peer Review', { delay: 100 });
   await page.waitForTimeout(3000);
   await page.locator('div[class="ag-input-field-label ag-label ag-checkbox-label ag-label-ellipsis"]').nth(1).click();
   await page.waitForTimeout(3000);
   await page.locator('button[type="submit"]').click();
   await page.waitForTimeout(3000);

   const gridcountAppealed = await page.locator('span[data-ref="lbRecordCount"]').innerText();
   await page.waitForTimeout(3000);
   console.log('Grid Appealed Count:', gridcountAppealed);
   await page.waitForTimeout(1000);

   if (AppealedDB === gridcountAppealed) {
       console.log('✅ The Appealed counts match!');
   } else {
       console.log(`❌ The Appealed counts do not match. Dashboard: ${AppealedDB}, Grid: ${gridcountAppealed}`);
   }
   await page.waitForTimeout(1500);

   //Back to Dashborad
    await page.locator('a[href="/dashboard"]').nth(1).click();
    await page.waitForTimeout(3000);
    await page.locator('button[class="btn btn-default"]').click(); //popbox
  
    //P2P 
   const P2PDB = await page.locator('span[id="peerCount"]').innerText();
   await page.waitForTimeout(3000);
   console.log('P2P DB Count:', P2PDB);
   await page.waitForTimeout(1000);

    //Dashboard page Submitted
   await page.locator('span[id="submittedcount"]').click();
   await page.waitForTimeout(1500);

    await page.locator('button[aria-label="Open Filter Menu"]').nth(5).click();
    await page.waitForTimeout(1000);
    await page.locator('div[class="ag-input-field-label ag-label ag-checkbox-label ag-label-ellipsis"]').nth(0).click();
    await page.waitForTimeout(1000);
    await page.locator('input[type="checkbox"]').nth(0).uncheck();
    await page.waitForTimeout(1000);

   await page.locator('input[aria-label="Search filter values"]').pressSequentially('Peer To Peer Review', { delay: 100 });
   await page.waitForTimeout(3000);
   await page.locator('div[class="ag-input-field-label ag-label ag-checkbox-label ag-label-ellipsis"]').nth(0).click();
   await page.waitForTimeout(3000);
   await page.locator('button[type="submit"]').click();
   await page.waitForTimeout(3000);

   const gridcountP2P = await page.locator('span[data-ref="lbRecordCount"]').innerText();
   await page.waitForTimeout(3000);
   console.log('Grid Peer To Peer Review Count:', gridcountP2P);
   await page.waitForTimeout(1000);

   if (P2PDB === gridcountP2P) {
       console.log('✅ The Peer To Peer Review counts match!');
   } else {
       console.log(`❌ The Peer To Peer Review counts do not match. Dashboard: ${P2PDB}, Grid: ${gridcountP2P}`);
   }
   await page.waitForTimeout(1500);

   //Back to Dashborad
    await page.locator('a[href="/dashboard"]').nth(1).click();
    await page.waitForTimeout(3000);
    await page.locator('button[class="btn btn-default"]').click(); //popbox

    //Docs Req
    const DocsReqDB = await page.locator('span[id="addDocSubCount"]').innerText();
    await page.waitForTimeout(3000);
    console.log('Docs Req DB Count:', DocsReqDB);
    await page.waitForTimeout(1000);

   //Dashboard page Submitted
   await page.locator('span[id="submittedcount"]').click();
   await page.waitForTimeout(1500); 

    await page.locator('button[aria-label="Open Filter Menu"]').nth(5).click();
    await page.waitForTimeout(1000);
    await page.locator('div[class="ag-input-field-label ag-label ag-checkbox-label ag-label-ellipsis"]').nth(0).click();
    await page.waitForTimeout(1000);
    await page.locator('input[type="checkbox"]').nth(0).uncheck();
    await page.waitForTimeout(1000);

    await page.locator('input[aria-label="Search filter values"]').pressSequentially('Additional Documents Required', { delay: 100 });
    await page.waitForTimeout(3000);
    await page.locator('div[class="ag-input-field-label ag-label ag-checkbox-label ag-label-ellipsis"]').nth(1).click();
    await page.waitForTimeout(3000);
    await page.locator('button[type="submit"]').click();
    await page.waitForTimeout(3000);

    const gridcountDocsReq = await page.locator('span[data-ref="lbRecordCount"]').innerText();
    await page.waitForTimeout(3000);
    console.log('Grid Docs Req Count:', gridcountDocsReq);
    await page.waitForTimeout(1000);

    if (DocsReqDB === gridcountDocsReq) {
    console.log('✅ The Docs Req counts match!');
    } else {
    console.log(`❌ The Docs Req counts do not match. Dashboard: ${DocsReqDB}, Grid: ${gridcountDocsReq}`);
    }
    await page.waitForTimeout(1500);


    //Back to Dashborad
    await page.locator('a[href="/dashboard"]').nth(1).click();
    await page.waitForTimeout(3000);
    await page.locator('button[class="btn btn-default"]').click(); //popbox

    //Approved Dashboard
    console.log("");
    console.log("\x1b[1m4.Approved Counts:\x1b[0m"); 


    await page.waitForSelector('span[id="approvedcount"]');  // Wait for the element to be available
    const dashboardCountApproved = await page.locator('span[id="approvedcount"]').innerText();
    console.log('Dashboard Approved Count:', dashboardCountApproved);
    await page.waitForTimeout(3000);
   
     // Grid count Approved
     await page.locator('span[id="approvedcount"]').click();
     await page.waitForTimeout(3000);
     
     await page.waitForSelector('span[data-ref="lbRecordCount"]');
     await page.waitForTimeout(3000);
     const gridcountApproved = await page.locator('span[data-ref="lbRecordCount"]').innerText();
     await page.waitForTimeout(3000);
     console.log('Grid Approved Count:', gridcountApproved);
     await page.waitForTimeout(1000);
 
     if (dashboardCountApproved === gridcountApproved) {
         console.log('✅ The Approved counts match!');
     } else {
         console.log(`❌ The Approved counts do not match. Dashboard: ${dashboardCountApproved}, Grid: ${gridcountApproved}`);
     }
     await page.waitForTimeout(3000);

      //Back to Dashborad
    await page.locator('a[href="/dashboard"]').nth(1).click();
    await page.waitForTimeout(3000);
    await page.locator('button[class="btn btn-default"]').click(); //popbox

    //Denied Dashboard
    console.log("");
    console.log("\x1b[1m5.Denied Counts:\x1b[0m"); 

    
    await page.waitForSelector('span[id="deniedcount"]');  // Wait for the element to be available
    const dashboardCountDenied = await page.locator('span[id="deniedcount"]').innerText();
    console.log('Dashboard Denied Count:', dashboardCountDenied);
    await page.waitForTimeout(3000);
   
     // Grid count Denied
     await page.locator('span[id="deniedcount"]').click();
     await page.waitForTimeout(3000);
     
     await page.waitForSelector('span[data-ref="lbRecordCount"]');
     await page.waitForTimeout(3000);
     const gridcountDenied = await page.locator('span[data-ref="lbRecordCount"]').innerText();
     await page.waitForTimeout(3000);
     console.log('Grid Denied Count:', gridcountDenied);
     await page.waitForTimeout(1000);
 
     if (dashboardCountDenied === gridcountDenied) {
         console.log('✅ The Denied counts match!');
     } else {
         console.log(`❌ The Denied counts do not match. Dashboard: ${dashboardCountDenied}, Grid: ${gridcountDenied}`);
     }
     await page.waitForTimeout(3000);

     //Back to Dashborad
    await page.locator('a[href="/dashboard"]').nth(1).click();
    await page.waitForTimeout(3000);
    await page.locator('button[class="btn btn-default"]').click(); //popbox


    //In Progress Dashboard
     console.log("");
    console.log("\x1b[1m6.In Progress Counts:\x1b[0m"); 

    
    await page.waitForSelector('span[id="pendingcount"]');  // Wait for the element to be available
    const dashboardCountIP = await page.locator('span[id="pendingcount"]').innerText();
    console.log('Dashboard In Progress Count:', dashboardCountIP);
    await page.waitForTimeout(3000);
   
     // Grid count In Progress
     await page.locator('span[id="pendingcount"]').click();
     await page.waitForTimeout(3000);
     
     await page.waitForSelector('span[data-ref="lbRecordCount"]');
     await page.waitForTimeout(3000);
     const gridcountIP = await page.locator('span[data-ref="lbRecordCount"]').innerText();
     await page.waitForTimeout(3000);
     console.log('Grid In Progress Count:', gridcountIP);
     await page.waitForTimeout(1000);
 
     if (dashboardCountIP === gridcountIP) {
         console.log('✅ The In Progress counts match!');
     } else {
         console.log(`❌ The In Progress counts do not match. Dashboard: ${dashboardCountIP}, Grid: ${gridcountIP}`);
     }
     await page.waitForTimeout(1500);

    //Back to Dashborad
    await page.locator('a[href="/dashboard"]').nth(1).click();
    await page.waitForTimeout(3000);
    await page.locator('button[class="btn btn-default"]').click(); //popbox

    //Appealed
    const AppealedDBIP = await page.locator('span[id="PenAppealedcount"]').innerText();
    await page.waitForTimeout(3000);
    console.log('Dashboard Appealed Count:', AppealedDBIP);
    await page.waitForTimeout(1000);

    //Dashboard page In Progress
    await page.locator('span[id="pendingcount"]').click();
    await page.waitForTimeout(1500);

    
    await page.locator('button[aria-label="Open Filter Menu"]').nth(5).click();
    await page.waitForTimeout(1000);
    await page.locator('div[class="ag-input-field-label ag-label ag-checkbox-label ag-label-ellipsis"]').nth(0).click();
    await page.waitForTimeout(1000);
    await page.locator('input[type="checkbox"]').nth(0).uncheck();
    await page.waitForTimeout(1000);

   await page.locator('input[aria-label="Search filter values"]').pressSequentially('Appeal Pending', { delay: 100 });
   await page.waitForTimeout(3000);
   await page.locator('div[class="ag-input-field-label ag-label ag-checkbox-label ag-label-ellipsis"]').nth(0).click();
   await page.waitForTimeout(3000);
   await page.locator('button[type="submit"]').click();
   await page.waitForTimeout(3000);

    //Appealed 
   const gridcountAppealedIP = await page.locator('span[data-ref="lbRecordCount"]').innerText();
   await page.waitForTimeout(3000);
   console.log('Grid Appealed Count:', gridcountAppealedIP);
   await page.waitForTimeout(1000);

   if (AppealedDBIP === gridcountAppealedIP) {
       console.log('✅ The Appealed counts match!');
   } else {
       console.log(`❌ The Appealed counts do not match. Dashboard: ${AppealedDBIP}, Grid: ${gridcountAppealedIP}`);
   }
   await page.waitForTimeout(1500);

   //Back to Dashborad
    await page.locator('a[href="/dashboard"]').nth(1).click();
    await page.waitForTimeout(3000);
    await page.locator('button[class="btn btn-default"]').click(); //popbox


   //DELAYED ORDERS
    console.log("");
    console.log("\x1b[1mDelayed Orders:\x1b[0m"); 

    const tableSelector = 'div[class="col-md-5"]';
    try {
    await page.waitForSelector(tableSelector, { state: 'visible', timeout: 5000 });
    const isTableVisible = await page.isVisible(tableSelector);
    //console.log(`Table visible: ${isTableVisible}`);
  
    if (isTableVisible) {
    console.log("✅ Data loaded successfully.");
   } else {
    console.log("❌ Data failed to load.");
   
  }
  } catch (error) {
  const err = error as Error;
  console.log("❌ Error while waiting for table to become visible:", err.message);
}

    await page.waitForTimeout(1000);


    //Time to Determination  
    console.log("");
    console.log("\x1b[1mTime To Determination:\x1b[0m");

    const graphSelector = 'div[class="col-md-7"]';
    try {
        await page.waitForSelector(graphSelector, { state: 'visible', timeout: 5000 });
        const isTableVisiblegraph = await page.isVisible(graphSelector);
        //console.log(`Graph visible: ${isTableVisiblegraph}`);

    if (isTableVisiblegraph) {
        console.log("✅ Graph data loaded successfully.");
    
    } else {
        console.log("❌ Graph data failed to load.");
    
    }
    }catch (error) {
     const err = error as Error;
     console.log("❌ Error while waiting for graph to become visible:", err.message);
   }

    await page.waitForTimeout(1500);

      if (page.url().includes('https://demo.authparency.com/')) {

        status = 'Pass';  
        addResult({
            srNo: '2',
            module: 'Dashboard',
            status: 'Pass',
            URL: '<a href="https://demo.authparency.com/">Dashboard</a>'
        });
    } else {
        addResult({
            srNo: '2',
            module: 'Dashboard',
            status: 'Fail',
            URL: '<a href="https://demo.authparency.com/">Dashboard</a>'
        });
    }



});


    // //Back to Dashborad
    // await page.locator('a[href="/dashboard"]').nth(1).click();
    // await page.waitForTimeout(3000);
    // await page.locator('button[class="btn btn-default"]').click(); //popbox


  


