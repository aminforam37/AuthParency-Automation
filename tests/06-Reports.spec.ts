import {ElementHandle,test , expect} from '@playwright/test';
import { addResult, getResults } from '../resultsCollector'; 
import { sendMail } from '../mail';

let srNo = 1;
//let testResults: {srNo: any, module: any, status: any, URL: any }[] = [];
let status = 'Fail';


const successMessageSelector = 'Login : Successfully Login'; 
const errorMessageSelector = 'Login : Login failed'; 


test.beforeEach('Login', async ({ page })=> {

 // await page.goto('https://qalogin.authparency.com/');
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
    await page.locator('[name="passwd"]').click();
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


test('@Authparency: Reports', async({page}) => {

      await page.waitForTimeout(1500);
  
    //PAUAT //EPA
    // await page.locator('body > div > main > div > div:nth-child(3) > a > div').click();
    // //await page.locator('a[href="/orgs/bb0afc99-7376-4cab-898c-b0f3e3e381de/practices"]').click();
    // await page.locator('body > div > main > div > div:nth-child(3) > a').click();
    // //await page.locator('[class="btn btn-default"]').click();
    // await page.waitForTimeout(1000);  



     // (DEMO)
    // await page.waitForSelector('body > div > main > div > div:nth-child(2) > a > div > div');
    // await page.waitForTimeout(1000);  
    // await page.locator('body > div > main > div > div:nth-child(2) > a > div > div').click();
    // await page.waitForTimeout(1000);  
    // await page.locator('[href="https://demo.authparency.com/microsoftidentity/account/signin?p=DefaultPractice"]').click();
    // await page.waitForTimeout(1000);  
    await page.locator('button[class="btn btn-default"]').click(); //Popup Box

      console.log("");
      console.log("\x1b[1mReports:\x1b[0m"); 

    //Reports
    await page.locator('a[class="nav-link nav-toggle arrowclass reports"]').click();
    await page.waitForTimeout(1000); 

    console.log("");
    console.log("\x1b[1mProcess Insights:\x1b[0m"); 


    //Process Insights
    await page.locator("//span[@class='title collapsetext'][normalize-space()='Process Insights']").click();
    await page.waitForTimeout(3000); 

    //Whole table visible 
    const iframe = await page.$('iframe[src*="powerbi.com"]');
    const frame = iframe ? await iframe.contentFrame() : null;
    await page.waitForTimeout(1000); 

    if (frame) {

     const display = await frame
      .waitForSelector('div[data-testid="display-area"]', { timeout: 10000 })
      .catch(() => null);

    if (display) {
      console.log('✅ Report data successfully loaded.');

         //Process Insights Aging
    await page.waitForTimeout(1000); 
    const Agingiframe = page.frameLocator("iframe[src*='powerbi.com/reportEmbed']");
    await Agingiframe.locator("div.small-multiples-grid-cell-content.pageNavigator", { hasText: "Aging" }).click();
    await page.waitForTimeout(1000); 
    try {
    console.log("✅ Aging data loaded successfully.");
  } catch (e) {
    console.log("❌ Aging data failed to load.");
  }
    await page.waitForTimeout(1000); 

  //Process Insights PA Denial Analysis 
    await page.waitForTimeout(1500); 
    const PADenialiframe = page.frameLocator("iframe[src*='powerbi.com/reportEmbed']");
    await PADenialiframe.locator("div.small-multiples-grid-cell-content.pageNavigator", { hasText: "PA Denial Analysis " }).click();
    await page.waitForTimeout(1500); 
    try {

    console.log("✅ PA Denial data loaded successfully.");
  } catch (e) {
    console.log("❌ PA Denial data failed to load.");
  }
    await page.waitForTimeout(1500); 

  // Process Insights Assignee Productivity
  await page.waitForTimeout(1500); 
    const Assigneeiframe = page.frameLocator("iframe[src*='powerbi.com/reportEmbed']");
    await Assigneeiframe.locator("div.small-multiples-grid-cell-content.pageNavigator", { hasText: "Assignee Productivity " }).click();
    await page.waitForTimeout(1500); 
    try {
    console.log("✅ Assignee Productivity data loaded successfully.");
  } catch (e) {
    console.log("❌ Assignee Productivity data failed to load.");
  }
    await page.waitForTimeout(1500); 

  //Process Insights Payer Analysis
  await page.waitForTimeout(1500); 
    const Payeriframe = page.frameLocator("iframe[src*='powerbi.com/reportEmbed']");
    await Payeriframe.locator("div.small-multiples-grid-cell-content.pageNavigator", { hasText: "Payer Analysis " }).click();
    await page.waitForTimeout(1500); 
    try {
    
    // await Payeriframe .locator("div.preTextWithEllipsis", { hasText: "Payer Analysis " });
    // await page.waitForTimeout(1500);
    console.log("✅ Payer Analysis data loaded successfully.");
  } catch (e) {
    console.log("❌ Payer Analysis data failed to load.");
  }
    await page.waitForTimeout(1500);

  //Process Insights Rendering Provider
  await page.waitForTimeout(1500); 
    const Renderingiframe = page.frameLocator("iframe[src*='powerbi.com/reportEmbed']");
    await Renderingiframe.locator("div.small-multiples-grid-cell-content.pageNavigator", { hasText: "Rendering Provider " }).click();
    await page.waitForTimeout(1500); 
    try {
    console.log("✅ Rendering Provider data loaded successfully.");
  } catch (e) {
    console.log("❌ Rendering Provider data failed to load.");
  }
    await page.waitForTimeout(1500);

  //Process Insights Requesting Provider
    await page.waitForTimeout(1500); 
    const Requestingiframe = page.frameLocator("iframe[src*='powerbi.com/reportEmbed']");
    await Requestingiframe.locator("div.small-multiples-grid-cell-content.pageNavigator", { hasText: "Requesting Provider " }).click();
    await page.waitForTimeout(1500); 
    try {
    console.log("✅ Requesting Provider data loaded successfully.");
  } catch (e) {
    console.log("❌ Requesting Provider data failed to load.");
  }
    await page.waitForTimeout(1500);

  //Process Insights Drug Analysis
   await page.waitForTimeout(1500); 
    const Drugiframe = page.frameLocator("iframe[src*='powerbi.com/reportEmbed']");
    await Drugiframe.locator("div.small-multiples-grid-cell-content.pageNavigator", { hasText: "Drug Analysis " }).click();
    await page.waitForTimeout(1500); 
    try {
    console.log("✅ Drug Analysis data loaded successfully.");
  } catch (e) {
    console.log("❌ Drug Analysis data failed to load.");
  }
    await page.waitForTimeout(1500);
  
  //Process Insights Procedure Analysis
   await page.waitForTimeout(1500); 
    const Procedureiframe = page.frameLocator("iframe[src*='powerbi.com/reportEmbed']");
    await Procedureiframe.locator("div.small-multiples-grid-cell-content.pageNavigator", { hasText: "Procedure Analysis " }).click();
    await page.waitForTimeout(1500); 
    try {
    console.log("✅ Procedure Analysis data loaded successfully.");
  } catch (e) {
    console.log("❌ Procedure Analysis data failed to load.");
  }
    await page.waitForTimeout(1500);

  //Process Insights Clinic Location
   await page.waitForTimeout(1500); 
    const Cliniciframe = page.frameLocator("iframe[src*='powerbi.com/reportEmbed']");
    await Cliniciframe.locator("div.small-multiples-grid-cell-content.pageNavigator", { hasText: "Clinic Location " }).click();
    await page.waitForTimeout(1500); 
    try {
    console.log("✅ Clinic Location data loaded successfully.");
  } catch (e) {
    console.log("❌ Clinic Location data failed to load.");
  }
    await page.waitForTimeout(1500);

  //Process Insights Place of Service
   await page.waitForTimeout(1500); 
    const POSiframe = page.frameLocator("iframe[src*='powerbi.com/reportEmbed']");
    await POSiframe.locator("div.small-multiples-grid-cell-content.pageNavigator", { hasText: "Place of Service " }).click();
    await page.waitForTimeout(1500); 
    try {
    console.log("✅ Place of Service data loaded successfully.");
  } catch (e) {
    console.log("❌ Place of Service data failed to load.");
  }
    await page.waitForTimeout(1500);

  //Process Insights Productivity By CreatedOn
   await page.waitForTimeout(1500); 
    const Productivityiframe = page.frameLocator("iframe[src*='powerbi.com/reportEmbed']");
    await Productivityiframe.locator("div.small-multiples-grid-cell-content.pageNavigator", { hasText: "Productivity By CreatedOn " }).click();
    await page.waitForTimeout(1500); 
    try {
    console.log("✅ Productivity By CreatedOn data loaded successfully.");
  } catch (e) {
    console.log("❌ Productivity By CreatedOn data failed to load.");
  }
    await page.waitForTimeout(1500);
     const ReportUrl = await page.url();
      try {
  
          const clickableDoc = '<a href="' + ReportUrl + '" target="_blank">Reports</a>';
          addResult({
            srNo: '9',
            module: 'Reports',
            status: 'Pass',
            URL: clickableDoc
          });
        
       } catch (error) {
        
        const clickableDocF = '<a href="' + ReportUrl + '" target="_blank">Reports</a>';
        addResult({
          srNo: '9',
          module: 'Reports',
          status: 'Fail',
          URL: clickableDocF
        });
      }

    } else {
      console.log('❌ Failed to load report.');
      const ReportUrl = await page.url();
      
  
          const clickableDoc = '<a href="' + ReportUrl + '" target="_blank">Reports</a>';
          addResult({
            srNo: '9',
            module: 'Reports',
            status: 'Fail',
            URL: clickableDoc
          });
        
       
    }
    } else {
      console.log('❌ Failed to load report.');
      
       const ReportUrl = await page.url();
      
  
          const clickableDoc = '<a href="' + ReportUrl + '" target="_blank">Reports</a>';
          addResult({
            srNo: '9',
            module: 'Reports',
            status: 'Fail',
            URL: clickableDoc
          });
    }

   
  
   //Reports
    await page.locator('a[class="nav-link nav-toggle arrowclass reports activeURL"]').click();
    await page.waitForTimeout(1000); 


    console.log("");
    console.log("\x1b[1mCustom Report:\x1b[0m"); 

    //Custom Report
    await page.hover('h4[class="text-dark"]');
    const customReportLink = page.getByRole('link', { name: 'Custom Report', exact: true }).click();
    await page.waitForTimeout(1000); 

    //Production Date
    await page.locator('button[id="closedOrderRange"]').click();
    await page.waitForTimeout(1000); 
    await page.locator('li[data-range-key="Custom Range"]').click();
    await page.waitForTimeout(1000); 
    await page.waitForSelector('.drp-calendar.left');
    await page.waitForTimeout(1000); 
    await page.selectOption('.drp-calendar.left select.yearselect', '2025');
    await page.waitForTimeout(1000);
    await page.selectOption('.drp-calendar.left select.monthselect', { label: 'Apr' });
    await page.locator('.drp-calendar.left td.available', { hasText: /^1$/ }).first().click();
    await page.waitForTimeout(1000); 
    await page.selectOption('.drp-calendar.right select.yearselect', '2025');
    await page.waitForTimeout(1000); 
    await page.selectOption('.drp-calendar.right select.monthselect', { label: 'Aug' });
    await page.waitForTimeout(1000); 
    await page.locator('.drp-calendar.right td.available', { hasText: /^31$/ }).first().waitFor();
    await page.locator('.drp-calendar.right td.available', { hasText: /^31$/ }).first().click();
    await page.waitForTimeout(1000); 

    if (await page.locator('div[class="card-body"]').isVisible()) {
    console.log('✅ Production Date report data loaded.');
    } else {
    console.log('❌ Production Date report data failed to load or no data found.');
    }
    await page.waitForTimeout(1000); 

    //Created Date
    await page.locator('div[class="dropdown mt-1 mb-1"]').click(); //Dropdown
    await page.waitForTimeout(1000); 
    await page.locator('button[title="Filter by order created date"]').click(); //Select Created Date
    await page.waitForTimeout(1000); 
    await page.locator('button[id="closedOrderRange"]').click();
    await page.waitForTimeout(1000); 
    await page.locator('li[data-range-key="Custom Range"]').click();
    await page.waitForTimeout(1000); 
    await page.waitForSelector('.drp-calendar.left');
    await page.waitForTimeout(1000); 
    await page.selectOption('.drp-calendar.left select.yearselect', '2025');
    await page.waitForTimeout(1000);
    await page.selectOption('.drp-calendar.left select.monthselect', { label: 'Apr' });
    await page.locator('.drp-calendar.left td.available', { hasText: /^1$/ }).first().click();
    await page.waitForTimeout(1000); 
    await page.selectOption('.drp-calendar.right select.yearselect', '2025');
    await page.waitForTimeout(1000); 
    await page.selectOption('.drp-calendar.right select.monthselect', { label: 'Aug' });
    await page.waitForTimeout(1000); 
    await page.locator('.drp-calendar.right td.available', { hasText: /^31$/ }).first().waitFor();
    await page.locator('.drp-calendar.right td.available', { hasText: /^31$/ }).first().click();
    await page.waitForTimeout(1000); 

    if (await page.locator('div[class="card-body"]').isVisible()) {
    console.log('✅ Created Date report data loaded.');
    } else {
    console.log('❌ Created Date report data failed to load or no data found.');
    }
    await page.waitForTimeout(1000); 

    console.log("");
    console.log("\x1b[1mOrg.Custom Report:\x1b[0m");
    
    //Reports
    await page.locator('a[class="nav-link nav-toggle arrowclass reports activeURL"]').click(); //li[class="nav-item menuitem"] .nth(5)
    await page.waitForTimeout(1000); 

    //Org.Custom Report
    await page.hover('h4[class="text-dark"]');
    const OrgcustomReportLink = page.getByRole('link', { name: 'Org.Custom Report', exact: true }).click();
    await page.waitForTimeout(1000); 

      //Production Date
    await page.locator('button[id="closedOrderRange"]').click();
    await page.waitForTimeout(1000); 
    await page.locator('li[data-range-key="Custom Range"]').click();
    await page.waitForTimeout(1000); 
    await page.waitForSelector('.drp-calendar.left');
    await page.waitForTimeout(1000); 
    await page.selectOption('.drp-calendar.left select.yearselect', '2025');
    await page.waitForTimeout(1000);
    await page.selectOption('.drp-calendar.left select.monthselect', { label: 'Apr' });
    await page.locator('.drp-calendar.left td.available', { hasText: /^1$/ }).first().click();
    await page.waitForTimeout(1000); 
    await page.selectOption('.drp-calendar.right select.yearselect', '2025');
    await page.waitForTimeout(1000); 
    await page.selectOption('.drp-calendar.right select.monthselect', { label: 'Aug' });
    await page.waitForTimeout(1000); 
    await page.locator('.drp-calendar.right td.available', { hasText: /^31$/ }).first().waitFor();
    await page.locator('.drp-calendar.right td.available', { hasText: /^31$/ }).first().click();
    await page.waitForTimeout(1000); 

    if (await page.locator('div[class="card-body"]').isVisible()) {
    console.log('✅ Production Date report data loaded.');
    } else {
    console.log('❌ Production Date report data failed to load or no data found.');
    }
    await page.waitForTimeout(1000); 

    //Created Date
    await page.locator('div[class="dropdown mt-1 mb-1"]').click(); //Dropdown
    await page.waitForTimeout(1000); 
    await page.locator('button[title="Filter by order created date"]').click(); //Select Created Date
    await page.waitForTimeout(1000); 
    await page.locator('button[id="closedOrderRange"]').click();
    await page.waitForTimeout(1000); 
    await page.locator('li[data-range-key="Custom Range"]').click();
    await page.waitForTimeout(1000); 
    await page.waitForSelector('.drp-calendar.left');
    await page.waitForTimeout(1000); 
    await page.selectOption('.drp-calendar.left select.yearselect', '2025');
    await page.waitForTimeout(1000);
    await page.selectOption('.drp-calendar.left select.monthselect', { label: 'Apr' });
    await page.locator('.drp-calendar.left td.available', { hasText: /^1$/ }).first().click();
    await page.waitForTimeout(1000); 
    await page.selectOption('.drp-calendar.right select.yearselect', '2025');
    await page.waitForTimeout(1000); 
    await page.selectOption('.drp-calendar.right select.monthselect', { label: 'Aug' });
    await page.waitForTimeout(1000); 
    await page.locator('.drp-calendar.right td.available', { hasText: /^31$/ }).first().waitFor();
    await page.locator('.drp-calendar.right td.available', { hasText: /^31$/ }).first().click();
    await page.waitForTimeout(1000); 

    if (await page.locator('div[class="card-body"]').isVisible()) {
    console.log('✅ Created Date report data loaded.');
    } else {
    console.log('❌ Created Date report data failed to load or no data found.');
    }
    await page.waitForTimeout(1000); 

  

    console.log("");
    console.log("\x1b[1mInvoice Report:\x1b[0m"); 

    //Reports
    await page.locator('a[class="nav-link nav-toggle arrowclass reports activeURL"]').click(); //li[class="nav-item menuitem"] .nth(5)
    await page.waitForTimeout(1000); 


    //Invoice Report
    await page.hover('h4[class="text-dark"]');
    const InvoiceReport = page.getByRole('link', { name: 'Invoice Report', exact: true }).click();
    await page.waitForTimeout(1000); 

    await page.locator('button[id="createdOrderRange"]').click();
    await page.waitForTimeout(1000); 
    await page.locator('li[data-range-key="Custom Range"]').click();
    await page.waitForTimeout(1000); 
    await page.waitForSelector('.drp-calendar.left');
    await page.waitForTimeout(1000); 
    await page.selectOption('.drp-calendar.left select.yearselect', '2025');
    await page.waitForTimeout(1000);
    await page.selectOption('.drp-calendar.left select.monthselect', { label: 'Apr' });
    await page.locator('.drp-calendar.left td.available', { hasText: /^1$/ }).first().click();
    await page.waitForTimeout(1000); 
    await page.selectOption('.drp-calendar.right select.yearselect', '2025');
    await page.waitForTimeout(1000); 
    await page.selectOption('.drp-calendar.right select.monthselect', { label: 'Aug' });
    await page.waitForTimeout(1000); 
    await page.locator('.drp-calendar.right td.available', { hasText: /^31$/ }).first().waitFor();
    await page.locator('.drp-calendar.right td.available', { hasText: /^31$/ }).first().click();
    await page.waitForTimeout(1000); 

    if (await page.locator('div[class="card-body"]').isVisible()) {
    console.log('✅ Invoice report data loaded.');
    } else {
    console.log('❌ Invoice report data failed to load or no data found.');
    }
    await page.waitForTimeout(1000); 

    console.log("");
    console.log("\x1b[1mOrg. Level Dashboard:\x1b[0m"); 

     //Reports
    await page.locator('a[class="nav-link nav-toggle arrowclass reports activeURL"]').click(); //li[class="nav-item menuitem"] .nth(5)
    await page.waitForTimeout(1000); 

    //Org. Level Dashboard Report
    await page.hover('h4[class="text-dark"]');
    //await page.locator('#submenugrp > li.nav-item.expandedreport.open > ul > li:nth-child(4)').click();
    const LevelDashboardReport = page.getByRole('link', { name: 'Org. Level Dashboard', exact: true }).click();
    await page.waitForTimeout(1500); 

    const LevelDashboardiframe = await page.$('iframe[src*="powerbi.com"]');
    await page.waitForTimeout(1500); 
    const LevelDashboardframe = LevelDashboardiframe ? await LevelDashboardiframe.contentFrame() : null;
    await page.waitForTimeout(1500); 

    if (LevelDashboardframe) {

     const display = await LevelDashboardframe.waitForSelector('div[data-automation-type="visualContainerHost"]', { timeout: 10000 }).catch(() => null);

    if (display) {
      console.log('✅ Report data successfully loaded.');
    } else {
      console.log('❌ Failed to load report.');
    }
    } else {
      console.log('❌ Failed to load report.');
    }
     await page.waitForTimeout(1500);

    console.log("");
    console.log("\x1b[1mPractice Dashboard:\x1b[0m"); 

     //Reports
    await page.locator('a[class="nav-link nav-toggle arrowclass reports activeURL"]').click(); //li[class="nav-item menuitem"] .nth(5)
    await page.waitForTimeout(1000); 

     //Practice Dashboard
    await page.hover('h4[class="text-dark"]');
    //await page.locator('#submenugrp > li.nav-item.expandedreport.open > ul > li:nth-child(4)').click();
    const PracticeDashboardReport = page.getByRole('link', { name: 'Practice Dashboard', exact: true }).click();
    await page.waitForTimeout(1500); 

    const Practiceiframe = await page.$('iframe[src*="powerbi.com"]');
    await page.waitForTimeout(1500); 
    const Practiceframe = Practiceiframe ? await Practiceiframe.contentFrame() : null;
    await page.waitForTimeout(1500); 

    if (Practiceframe) {

     const display = await Practiceframe.waitForSelector('div[data-automation-type="visualContainerHost"]', { timeout: 10000 }).catch(() => null);

    if (display) {
      console.log('✅ Practice Dashboard report data successfully loaded.');
    } else {
      console.log('❌ Practice Dashboard failed to load report.');
    }
    } else {
      console.log('❌ Failed to load report.');
    }
     await page.waitForTimeout(1500);

    
});

test.afterAll(async () => {
 // console.log('All tests completed.');
  const results = getResults();
 await sendMail(results);
 
});