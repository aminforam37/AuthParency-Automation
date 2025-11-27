import { test, expect } from '@playwright/test';
import{faker} from '@faker-js/faker';
import { sendMail } from '../mail';
import { addResult, getResults } from '../resultsCollector'; 

let srNo = 1;
//let testResults: {srNo: any, module: any, status: any, URL: any }[] = [];
let status = 'Fail';


const firstName = faker.person.firstName();
const middleName = faker.person.middleName().charAt(0);
const lastName = faker.person.lastName().split('-')[0];
const fullName = `${firstName} ${middleName} ${lastName}`.replace(/\s+/g, ' ').trim();
const inputMRN = faker.number.int({ min: 10000, max: 99999 }).toString();
const address = faker.location.streetAddress();
const city = faker.location.city();
const postalCode = faker.location.zipCode(faker.number.int({ min: 10000, max: 99999 }).toString());
const contactnumber = faker.phone.number();
const memberID = faker.number.int({ min: 10000, max: 99999 }).toString();
const doseunit = faker.number.int({min:1 , max:20});
const unit = `${doseunit}MG`;
const Frequency = faker.number.int({min:1,max:50}).toString();
const Quantity = faker.number.int({min:1,max:50}).toString();
const cyclecount = faker.number.int({min:1, max:50}).toString();
const ProQuantity = faker.number.int({min:1,max:50}).toString();
const editdose = faker.number.int({min:1 , max:20});
const editunit = `${editdose}MG`;
const editfrequency = faker.number.int({min:1, max:50}).toString();
const successMessageSelector = 'Login : Successfully Login'; 
const errorMessageSelector = 'Login : Login failed'; 
const Status = 'Appeal Denied';
const Outcome ='Closed';
const AssignedTo = 'Foram Amin';
const CreatedBy = 'Foram Amin';

test.beforeEach('Login', async ({ page })=> {

  await page.goto('https://devlogin.authparency.com/orgs');
    
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

       
         if (page.url().includes('https://devlogin.authparency.com/orgs')) {

        status = 'Pass';  
        addResult({
            srNo: '1',
            module: 'Login',
            status: 'Pass',
            URL: '<a href="https://devlogin.authparency.com/orgs">Login</a>'
        });
    } else {
        addResult({
            srNo: '1',
            module: 'Login',
            status: 'Fail',
            URL: '<a href="https://devlogin.authparency.com/orgs">Login</a>'
        });
    }
 
});


test(' CreatedOrder', async ({ page }) => {

    await page.waitForTimeout(1500);
  
    //PAUAT //EPA
    await page.locator('body > div > main > div > div:nth-child(3) > a > div').click();
    //await page.locator('a[href="/orgs/bb0afc99-7376-4cab-898c-b0f3e3e381de/practices"]').click();
    await page.locator('body > div > main > div > div:nth-child(3) > a').click();
    //await page.locator('[class="btn btn-default"]').click();
    await page.locator('button[class="btn btn-default"]').click(); //Popup Box
    await page.waitForTimeout(1000);  
    await page.locator('a[href="/orders"]').click();
    
    // //(DEMO)
    // await page.waitForSelector('body > div > main > div > div:nth-child(2) > a > div > div');
    // await page.waitForTimeout(1000);  
    // await page.locator('body > div > main > div > div:nth-child(2) > a > div > div').click();
    // await page.waitForTimeout(1000);  
    // await page.locator('[href="https://demo.authparency.com/microsoftidentity/account/signin?p=DefaultPractice"]').click();
    // await page.locator('[href="/orders"]').click();
    // await page.waitForTimeout(1000);  
    // //await page.locator('[class="btn btn-default"]').click();

    console.log("");
    console.log(" \x1b[1mOrder Creation:\x1b[0m"); 
    console.log("📝 Initiating new order creation flow...");

    // Order create +
    await page.locator('[href="/create-order"]').click();
    await page.waitForTimeout(1000);
   
    await page.locator('input[name="firstName"]').fill(firstName);
    await page.waitForTimeout(1500);
    
    await page.locator('input[name="middleName"]').fill(middleName);
    await page.waitForTimeout(1500);
    
    await page.locator('input[name="lastName"]').fill(lastName);
    await page.waitForTimeout(1500);

    
    await page.locator('input[name="MRN"]').fill(inputMRN); 
    await page.waitForTimeout(1500);
   
    //Date 
    await page.waitForTimeout(1000);  
    await page.locator('input[name="patientdob"]').click();
    await page.locator('td[class="today day"]').click();
    await page.waitForTimeout(1500);

    await page.locator('span[class="selection"]').nth(1).click();
    await page.waitForTimeout(1000);  
    await page.locator('li[class="select2-results__option"]').nth(1).click();
    await page.waitForTimeout(1000);  

    await page.locator('[id="address"]').fill(address);
    await page.locator('[id="city"]').fill(city);
    await page.locator('[id="zip"]').fill(postalCode);
    await page.locator('[class="selection"]').nth(2).click();
    await page.locator('[class="select2-result-repository__title"]').nth(1).click();

    
    await page.locator('[id="contactnumber"]').fill(contactnumber);
    await page.waitForTimeout(1500);

    //Insurance
    //Date of service
    await page.locator('input[id="DOSStart"]').click();
    await page.waitForTimeout(1000);  
    await page.locator('td[class="today day"]').click();
    await page.locator('[title="Add Insurance"]').click();
    await page.waitForTimeout(1000);
    const Payer = page.locator("li[role='option']").nth(1)
    const PrimaryPayer = await Payer.textContent();
    await Payer.click();
    const PayerName = await page.locator('span[id="select2-payer200-container"]').innerText();
    await page.waitForTimeout(1000);
    await page.locator('div> input[name="policyReq"]').fill(memberID);
    await page.waitForTimeout(1000); 
    await page.locator('span[role="textbox"]').nth(4).click();
    await page.locator('li[role="option"]').first().click();
    await page.waitForTimeout(1000); 
    await page.locator('[title="Save"]').click();

     // Physician
    await page.locator('[id="datereq"]').click();
    await page.locator('td[class="today day"]').click();
    await page.waitForTimeout(1000);  

    //Order Received
     await page.locator('[id="daterec"]').click();
     await page.locator('td[class="today day"]').click();
     await page.waitForTimeout(1000);  

    // //Requested Date
    // await page.locator('[id="pastartdate"]').click();
    // await page.locator('td[class="today day"]').click();

    //Place of service
    await page.locator('#Orderdetailsform').getByLabel('', { exact: true }).first().click(); 
    await page.locator("li[role='option']").nth(3).click();
  
    //Location
    await page.locator('[aria-labelledby="select2-userLocationId-container"]').click();
    await page.locator("li[role='option']").nth(2).click();
    
     //Categorization
    await page.locator('[aria-labelledby="select2-specialt-container"]').click();
    await page.locator("li[role='option']").nth(3).click();
    const Categorization = await page.locator('[aria-labelledby="select2-specialt-container"]').textContent();

    //State
    await page.locator('[aria-labelledby="select2-stat-container"]').click();
    await page.locator("li[role='option']").nth(1).click();

    // //Requesting Provider DEMO
    // await page.locator('input[name="reqname"]').pressSequentially('ACCIME', { delay: 100 }); // Types slower, like a user
    // await page.waitForTimeout(1000); 
    // await page.locator('#completionOptions > table > tbody > tr.suggestion').click();
    // await page.waitForTimeout(1000); 

    // //Rendering Provider
    // await page.locator('input[name="sername"]').pressSequentially('ACCIME', { delay: 100 }); 
    // await page.waitForTimeout(1000); 
    // await page.locator('#completionOptions > table > tbody > tr.suggestion').click();
    // await page.waitForTimeout(1000); 


    //Requesting Provider EPA
    await page.locator('span[aria-labelledby="select2-reqProvider-container"]').click();
    await page.locator("li[role='option']").nth(1).click();

    //Rendering Provider
    await page.locator('span[aria-labelledby="select2-renProvider-container"]').click();
    await page.locator("li[role='option']").nth(1).click();

    //Medications

    //Name
    await page.locator('span[id="drugbtnparent1"]').click();
    await page.waitForTimeout(1000); 
    await page.locator('span[id="select2-drugname400-container"]').pressSequentially('RITUXAN', { delay: 100 });
    await page.waitForTimeout(1000); 
    await page.locator('li[role="option"]').nth(0).click();
    await page.waitForTimeout(1000); 

    //Dosage
    await page.locator('span[aria-labelledby="select2-dose400-container"]').click();
    await page.waitForTimeout(1000); 
    await page.locator('li[class="select2-results__option select2-results__option--highlighted"]').click();
    await page.waitForTimeout(1000); 

    // //CPT Code
    // await page.locator('span[aria-labelledby="select2-cpt400-container"]').click();
    // await page.waitForTimeout(1000); 

    //DX Code 
    await page.locator('span[aria-labelledby="select2-primarydxcode400-container"]').click();
    await page.locator('input[aria-controls="select2-primarydxcode400-results"]').pressSequentially('a', { delay: 100 });
    await page.waitForTimeout(1000); 
    await page.locator('li[role="option"]').nth(1).click();
    await page.waitForTimeout(1000); 

    //Dose Unit 
    await page.locator('input[name="strengthToBeGivenReq"]').fill(unit);
    await page.waitForTimeout(1000); 

     // Frequency
     await page.locator('input[name="FreqReq"]').fill(Frequency);
     await page.waitForTimeout(1000); 

    // Quantity
    await page.locator('input[name="QtyReq"]').fill(Quantity);
    await page.waitForTimeout(1000); 

    //Cycle count
    await await page.locator('input[name="CycleReq"]').fill(cyclecount);
    await page.waitForTimeout(1000); 

    //Save
    await page.locator('[class="disabled actionbtn me-1"]').click();
    await page.waitForTimeout(1000); 

    //Add multiple medications
    await page.locator('span[id="select2-drugoncoselect-container"]').click();
    await page.waitForTimeout(1000)
    await page.locator('li[class="select2-results__option"]').nth(2).click();   
    await page.waitForTimeout(1000); 

    //Toggle approval logic
    const toggleApproval = async (approvalRequired: boolean) => {
    const toggleButtons = page.locator('span[class="slider red round"]'); 
    const toggleCount = await toggleButtons.count();
    
    for (let i = 0; i < toggleCount; i++) {
      const toggleButton = toggleButtons.nth(i);
    
      const isToggleOn = await toggleButton.getAttribute('class');
      const currentClass = isToggleOn ?? '';
  
    if (approvalRequired) {
      // If approval is required and the toggle is off, click it to turn it on
      if (!currentClass.includes('active')) {
        await toggleButton.click();
       // console.log('Toggled ON for approval required.');
      }
    } else {
      // If approval is not required and the toggle is on, click it to turn it off
      if (currentClass.includes('active')) {
        await toggleButton.click();
       // console.log('Toggled OFF for no approval required.');
      }
    }
    }
  };
  
    await page.waitForTimeout(1000); 
    // For Multiple medications
    await toggleApproval(true);  // Call with 'true' if approval is required
    await toggleApproval(false); // Call with 'false' if approval is not required
    await page.waitForTimeout(1500); 
  
    //Delete
    await page.locator('i[title="Delete"]').nth(4).click();
    await page.waitForTimeout(1000);
    await page.locator('i[title="Delete"]').nth(3).click();
    await page.waitForTimeout(1000);
    await page.locator('i[title="Delete"]').nth(2).click();
    await page.waitForTimeout(1000);
    
    //Edit 
    await page.locator('a.disabled.actionbtn.me-1.edit5000 i[title="Edit"]').click();
    await page.waitForTimeout(1500); 
    
    //Edit DX Code
    await page.locator('span> span[aria-labelledby="select2-primarydxcode5000-container"]').click();
    await page.locator('input[aria-controls="select2-primarydxcode5000-results"]').pressSequentially('s', { delay: 100 });
    await page.waitForTimeout(1000); 
    await page.locator('li[role="option"]').nth(1).click();
    await page.waitForTimeout(1000); 


    // await page.locator('input[class="form-control primarydxcode"]').click();
    // await page.locator('input[name="priDxCodeReq"]').pressSequentially('a2', { delay: 100 });
    // await page.waitForTimeout(1000); 
    // await page.locator('#completionOptions > table > tbody > tr.suggestion > td:nth-child(1)').click();
    // await page.waitForTimeout(1000); 
    
    //Edit Dose Unit 
    await page.locator('input[name="strengthToBeGivenReq"]').fill(editunit);
    await page.waitForTimeout(1000); 
    
    //Edit Frequency
    await page.locator('input[name="FreqReq"]').fill(editfrequency);
    await page.waitForTimeout(1000); 
    
    //Save After Editing
    await page.locator('[class="disabled actionbtn me-1"]').click();
    await page.waitForTimeout(1000); 

    //Procedures
    await page.locator('span[id="procbtnparent1"]').click();
    await page.waitForTimeout(1000); 
    await page.locator('span[class="select2-search select2-search--dropdown"]').pressSequentially('Fr', { delay: 100 });
    await page.waitForTimeout(1000); 
    await page.locator('div[class="select2-result-repository__description"]').nth(3).click();
    await page.waitForTimeout(1500); 

    //DX Code 
    await page.locator('div[class="removemargin"]').nth(2).click();
    await page.locator('input[aria-controls="select2-primarydxcode100-results"]').pressSequentially('a', { delay: 100 });
    await page.waitForTimeout(1000); 
    await page.locator('li[role="option"]').nth(1).click();
    await page.waitForTimeout(1000); 


    //Quantity 
    await page.locator('div> input[name="QtyReqS"]').clear();
    await page.locator('div> input[name="QtyReqS"]').fill(ProQuantity);
    await page.waitForTimeout(1000); 


    //Save
    await page.locator('[class="disabled actionbtn me-1"]').click();
    await page.waitForTimeout(1000); 

    // //Add multiple procedures Demo
    // await page.locator('span[id="select2-oncoselect-container"]').click();
    // await page.waitForTimeout(1000)
    // await page.locator('li[class="select2-results__option"]').nth(3).click();
    // await page.waitForTimeout(1000); 
    // await page.locator('span[class="select2-selection__placeholder"]').click();
    // await page.waitForTimeout(1000); 
    // await page.locator('li[class="select2-results__option select2-results__option--highlighted"]').click();
    // await page.waitForTimeout(3000); 



    // Toggle approval logic
    const toggleProcedureApproval = async (approvalRequiredProcedure: boolean) => {
      const procedureToggleButtons = page.locator('.switchToggle.changeprocstatus.ms-2');
      const toggleCountprocedure = await procedureToggleButtons.count();
      
      for (let i = 0; i < toggleCountprocedure; i++) {
        const toggleButtonprocedure = procedureToggleButtons.nth(i);
      
        const isToggleOn = await toggleButtonprocedure.getAttribute('class');
      const currentClassProcedure = isToggleOn ?? '';

      if (approvalRequiredProcedure) {
        // If approval is required and the toggle is off, click it to turn it on
        if (!currentClassProcedure.includes('active')) {
          await toggleButtonprocedure.click();
          //console.log('Toggled ON for approval required.');
        }
      } else {
        // If approval is not required and the toggle is on, click it to turn it off
        if (currentClassProcedure.includes('active')) {
          await toggleButtonprocedure.click();
          //console.log('Toggled OFF for no approval required.');
        }
      }
      }
    };

    await page.waitForTimeout(1000); 
    // For Multiple medications
    await toggleProcedureApproval(true);  // Call with 'true' if approval is required
    await toggleProcedureApproval(false); // Call with 'false' if approval is not required
    await page.waitForTimeout(1500); 

  // //Edit
  // await page.locator('a.disabled.actionbtn.me-1.edit5000 i[title="Edit"]').nth(1).click();
  // await page.waitForTimeout(3000); 

  // //Edit DX Code 
  // await page.locator('span[aria-labelledby="select2-primarydxcode400-container"]').click();
  //   await page.locator('input[role="searchbox"][aria-controls="select2-primarydxcode100-results"]').pressSequentially('a', { delay: 100 });
  //   await page.waitForTimeout(1000); 
  //   await page.locator('li[role="option"]').nth(1).click();
  //   await page.waitForTimeout(1000); 

  // // await page.locator('input[class="form-control primarydxcode"]').click();
  // // await page.locator('input[name="priDxCodeReqS"]').pressSequentially('a2', { delay: 100 });
  // // await page.waitForTimeout(1000); 
  // // await page.locator('#completionOptions > table > tbody > tr.suggestion > td:nth-child(1)').click();
  // // await page.waitForTimeout(1000); 

  // //Save After Editing
  // await page.locator('[class="disabled actionbtn me-1"]').click();
  // await page.waitForTimeout(1000);



  //Assign
  await page.locator('span[id="select2-assigntootherselect-container"]').click();
  await page.waitForTimeout(1500); 
  await page.locator('.select2-result-repository__title').nth(1).click();
  await page.waitForTimeout(1000); 

  //Create 
  await page.locator('button[id="createbtn"]').click();
  await page.waitForTimeout(1000); 

          if (page.url().includes('https://dev.authparency.com/create-order#/'))  
        { 

        status = 'Pass';  
        addResult({
            srNo: '3',
            module: 'Order Creation',
            status: 'Pass',
            URL: '<a href="https://dev.authparency.com/create-order#/">Order Creation</a>'
        });
    } else {
        addResult({
            srNo: '3',
            module: 'Order Creation',
            status: 'Fail',
            URL: '<a href="https://dev.authparency.com/create-order#/">Order Creation</a>'
        });
    }

  //Conf
  await page.locator('button[id="locationconfirmclick"]').click();
  await page.waitForTimeout(1500); 

  

   if (inputMRN) {
      console.log(`✅ Order created successfully. MRN: ${inputMRN}.`);
    } else {
      console.log("❌ Order creation failed. Order ID not generated or submission was unsuccessful.");
    }


//   //History 
//   await page.locator('a[title="View Order History"]').click();
//   await page.waitForTimeout(1000);

//   const History_FirstName  = await page.locator('span[class="badge badge-default badgecssNone"]').innerText();
 

// if(
  
//        firstName == History_FirstName.trim()



// ) {
//   console.log("Patient Details Matched Successfully!");
// } else{
//    console.log("Patient Details do not match!");

// }

   await page.waitForSelector('div.datetime', { timeout: 5000 });
  const CreatedDate = await page.locator('div.datetime').first().textContent();
  //console.log('Created Date:', CreatedDate);

    console.log("");
    console.log("\x1b[1mOrder Processing:\x1b[0m"); 

  //Benefits Verification
    //Checked in payer portal
    await page.locator('span[aria-labelledby="select2-PAprocess-container"]').click();
    await page.waitForTimeout(1000); 
    await page.locator('li[class="select2-results__option"]').nth(2).click();
    await page.waitForTimeout(1000); 

    await page.locator('input[class="form-control cerror"]').nth(0).fill('1');
    await page.waitForTimeout(1000); 
    await page.locator('input[class="form-control cerror"]').nth(1).fill('1');
    await page.waitForTimeout(1000); 
    await page.locator('input[class="form-control cerror"]').nth(2).fill('1');
    await page.waitForTimeout(1000); 
    await page.locator('input[class="form-control cerror"]').nth(3).fill('1');
    await page.waitForTimeout(1000); 
    await page.locator('input[class="form-control cerror"]').nth(4).fill('1');
    await page.waitForTimeout(1000); 
    await page.locator('input[class="form-control cerror"]').nth(5).fill('1');
    await page.waitForTimeout(1000); 
    await page.locator('input[class="form-control cerror"]').nth(6).fill('1');
    await page.waitForTimeout(1000); 
    await page.locator('input[class="form-control cerror"]').nth(7).fill('1');
    await page.waitForTimeout(1000); 
    await page.locator('input[class="bvcomp form-control datevalidate"]').click();
    await page.locator('td[class="today day"]').click();
    await page.locator('input[id="copay"]').fill('1200');
    await page.waitForTimeout(1000); 
    await page.locator('input[class="form-control cerror"]').nth(8).fill('1');
    await page.waitForTimeout(1000); 
    await page.locator('input[class="form-control cerror"]').nth(9).fill('1');
    await page.waitForTimeout(1000); 
    await page.locator('input[class="form-control cerror"]').nth(5).fill('1');
    await page.locator('[name="BVNotes"]').fill('Documents Test');
    await page.waitForTimeout(1000); 

    //Prior Auth Required
    await page.locator('input[name="benefitver"]').nth(2).click();
    await page.waitForTimeout(1000); 
  
    //Complete Benefits Verification 
    await page.locator('[class="btn btn-success float-end btn-lg ms-2"]').nth(0).click();
    await page.waitForTimeout(3000); 

     // PA Submission [Third Payer Portal]
     await page.locator('span[aria-labelledby="select2-submissionmethod-container"]').click();
     await page.waitForTimeout(1000);
     await page.locator('li[class="select2-results__option"]').nth(3).click();
     await page.waitForTimeout(1000); 
     await page.locator('span[aria-labelledby="select2-thirdpayerportal-container"]').click();
     await page.waitForTimeout(1000);
     await page.locator('li[class="select2-results__option"]').nth(3).click();
     const Reference = faker.number.int({min:10000,max:99999}).toString();
     await page.locator('input[id="Refno"]').fill(Reference);
     await page.waitForTimeout(1000); 
     await page.locator('input[id="AuthReqOn"]').click();
     await page.waitForTimeout(1000); 
     await page.locator('td[class="today day"]').click();
     await page.waitForTimeout(1000); 

    //Complete PA Submission
     await page.locator('[class="btn btn-success float-end btn-lg ms-2"]').nth(1).click();
     await page.waitForTimeout(3000);

    //Determination Partial Approved 
    await page.locator('input[class="form-control datevalidate floating-input"]').nth(6).click();
    await page.waitForTimeout(1000); 
    await page.locator('td[class="today day"]').click();
    await page.waitForTimeout(1000); 
    const DR = faker.number.int({min:10000,max:99999}).toString();
    await page.locator('input[id="det_confirmation"]').fill(DR);
    await page.waitForTimeout(1000); 
    const PriorAuth = faker.number.int({min:10000,max:99999}).toString();
    await page.locator('input[id="det_parequested"]').fill(PriorAuth);
    await page.locator('div[class="input-group date datepicker_ren floating-label-content"]').click();
    await page.locator('td[class="today day"]').click();
    await page.waitForTimeout(1000); 

    // Edit Medication 1
     await page.locator('a.actionbtn i[title="Edit"]').nth(4).click();
     await page.waitForTimeout(1500); 
     await page.locator('input[name="apstartReq"]').click();
     await page.locator('td[class="today day"]').click();
     await page.waitForTimeout(1500); 
     await page.locator('input[name="apendReq"]').click();
     await page.locator('td[class="today day"]').click();
     await page.waitForTimeout(1500);
     await page.locator('input[name="QtyReq"]').fill(Quantity);
     await page.waitForTimeout(1000); 
 
      //Save After Editing
      await page.locator('[class="disabled actionbtn me-1"]').click();
      await page.waitForTimeout(1000); 

      const toggleMedicationPartialApproved = async (DeniedRequiredMedication: boolean) => 
        {
         const MedicationToggleButtons = page.locator('div[col-id="isApproved"] > div > label[class="switchToggle changedrugstatus"]').nth(1);
       
          await MedicationToggleButtons.click();
    
          await page.waitForTimeout(1000); 
          
          const isActive = await MedicationToggleButtons.getAttribute('class') ?? '';
        
        if (isActive.includes('active')) {
          //console.log('Turned the Toggle ON');
          await MedicationToggleButtons.click(); // Turn off the toggle if it's on
        } else {
          //console.log('Toggle is already ON');
        }
          await page.waitForTimeout(1000); 
      }
      await page.waitForTimeout(1000); 
      await toggleMedicationPartialApproved(false); // Call with 'false' if approval is not required
      await page.waitForTimeout(1000); 
    
        //Edit Procedure 
        await page.locator('a.actionbtn i[title="Edit"]').nth(6).click();
        await page.waitForTimeout(1500); 

        //Start Request
        await page.locator('input[name="apstartReq"]').click();
        await page.locator('td[class="today day"]').click();
        await page.waitForTimeout(1500); 

        //End Request
        await page.locator('input[name="apendReq"]').click();
        await page.locator('td[class="today day"]').click();
        await page.waitForTimeout(1500); 

        //Quantity Required
        await page.locator('input[name="QtyReq"]').fill(ProQuantity);
        await page.waitForTimeout(1000); 

        // Save the changes after editing
        await page.locator('[class="disabled actionbtn me-1"]').click();
        await page.waitForTimeout(1000); 

        // const toggle = async (DeniedRequiredMedication) => 
        //   {
        //     const ToggleButtons = page.locator('label[title="Click to change procedure status to denied"]').nth(1);
          
        //       await ToggleButtons.click();
        
        //       await page.waitForTimeout(1000); 
        //       const isActive = await ToggleButtons.getAttribute('class') ?? '';
              
        //       if (isActive.includes('active')) {
        //        // console.log('Turned the Toggle OFF');
        //         await ToggleButtons.click(); // Turn off the toggle if it's on
        //       } else {
        //         //console.log('Toggle is already OFF');
        //       }
        //         await page.waitForTimeout(1000); 
        //     }
            
        //       await page.waitForTimeout(1000); 
        //       await toggle(false); // Call with 'false' if approval is not required
        //       await page.waitForTimeout(3000); 
              
      //Close EHR
      await page.locator('input[name="EHRverclose"]').nth(0).click(); 
      await page.waitForTimeout(1500); 

      //Record PA Partial Approval 
      await page.locator('button[id="PAaprovedpartial"]').click();
      await page.waitForTimeout(1500); 

             if (page.url().includes('/myorder/')) {
        //console.log("URL",page.url());
        const benefitsUrl = page.url();
        const orderIdMatch = benefitsUrl.match(/\/myorder\/([a-f0-9-]+)/i);
        const orderId = orderIdMatch ? orderIdMatch[1] : 'Unknown';
        const clickableLink = `<a href="${benefitsUrl}" target="_blank">Order Processing</a>`;

        addResult({
          srNo: '4',
          module: 'Order Processing',
          status: 'Pass',
          URL: clickableLink
        });
      } else {
        const failedUrl = page.url();
        const orderIdMatch = failedUrl.match(/\/myorder\/([a-f0-9-]+)/i);
        const orderId = orderIdMatch ? orderIdMatch[1] : 'Unknown';
        const clickableLinkF = `<a href="${failedUrl}" target="_blank">Order Processing</a>`;

        addResult({
         srNo: '4',
         module: 'Order Processing',
         status: 'Fail',
         URL: clickableLinkF
        });
      }
      
      //Close Confirmation
      await page.locator('a[id="closebtnClick"]').nth(0).click();
      await page.waitForTimeout(3000);

      const Orderprocess = true; 
      if (Orderprocess) {
          console.log("✅ Order successfully processed through Partial Approved. ");
      } else {
          console.log("❌ Order was not processed as expected. ");
      }

      
  

      //Orders to searchbar
      await page.locator('a[href="/orders"]').click();

      //EPA Search From All Orders
      await page.locator('div> a[id="orderDropdownMenuLink"]').click();
      await page.waitForTimeout(1000);
      await page.locator('li> button[data-filtertype="AllOrder"]').click();
      await page.waitForTimeout(1000);

      //Search Bar
      await page.locator('input[placeholder="Press Enter To Search"]').click();
      await page.waitForTimeout(1000);  
      await page.locator('input[placeholder="Press Enter To Search"]').fill(inputMRN);
      await page.waitForTimeout(1000);  
      //Press Enter
      await page.locator('input[placeholder="Press Enter To Search"]').press('Enter');
      await page.waitForTimeout(1000); 
      await page.locator(`a[title="Click to view order details"]:has-text("${inputMRN}")`).click();
      await page.waitForTimeout(1000); 

      console.log("");
      console.log("\x1b[1mReopening Order:\x1b[0m"); 



      //Reopen
      await page.locator('div> button[title="Reopen Order"]').click(); //need to check
      await page.waitForTimeout(1000); 

      // //Reopen Confirmation
      // await page.locator('[title="Reopen Order"]').click();
      // await page.waitForTimeout(1500); 

      const turnOffReopenToggles = async () => {
      const toggleIds = [
        'chkReopenCarryData',
        'chkReopenCarryNotes',
        'chkReopenCarryAttachments',
      ];

      for (const id of toggleIds) {
        const input = page.locator(`#${id}`);
        const spanToggle = input.locator('xpath=following-sibling::span');

        if (await input.isChecked()) {
         // console.log(`${id} is ON. Turning it OFF...`);
          await spanToggle.click(); // Click the visible toggle
          await page.waitForTimeout(500); // Optional
        } else {
          //console.log(`${id} is already OFF.`);
        }
      }
    };

      await turnOffReopenToggles();

      await page.locator('[id="reopenReason"]').fill('Reopen the order');
      await page.waitForTimeout(1500); 
      await page.locator('[id="reopenBtn"]').click();
      await page.waitForTimeout(1500); 

      const ReopenOrder = true; 
      if (ReopenOrder) {
          console.log("✅ Order has been reopened and is now active. ");
      } else {
          console.log("❌ Failed to reopen the order. Please verify the process. ");
      }

      
      

    //Benefits Verification
    //Benefits verification performed by the client

    await page.locator('span[aria-labelledby="select2-PAprocess-container"]').click();
    await page.waitForTimeout(1000); 
    await page.locator('li[class="select2-results__option"]').nth(3).click();
    await page.waitForTimeout(1000); 

     //Prior Auth Required
     await page.locator('input[name="benefitver"]').nth(2).click();
     await page.waitForTimeout(1000); 
 
     //Complete Benefits Verification 
     await page.locator('[class="btn btn-success float-end btn-lg ms-2"]').nth(0).click();
     await page.waitForTimeout(3000); 

      //PA Submission : PA Submission Fax 
      
      await page.locator('span[aria-labelledby="select2-submissionmethod-container"]').click();
      await page.waitForTimeout(1000); 
      await page.locator('li[class="select2-results__option"]').nth(0).click();
      await page.waitForTimeout(3000); 
      await page.locator('input[id="faxnumber"]').fill('7541258910');
      await page.waitForTimeout(1000); 
      await page.locator('input[id="Refno"]').fill('101010');
      await page.waitForTimeout(1000); 
      await page.locator('input[id="AuthReqOn"]').click();
      await page.waitForTimeout(1000); 
      await page.locator('td[class="today day"]').click();
      await page.waitForTimeout(1500); 
      // await page.locator('tr:nth-child(1) > td:nth-child(4)').click();
      // await page.waitForTimeout(3000); 
      await page.locator('div> button[id="orderdetermination"]').click();
      await page.waitForTimeout(3000);

      console.log("");
      console.log("\x1b[1mOrder Denied:\x1b[0m"); 

      //refresh the page
       await page.reload();

  //Toggle Denied 
  
  const ROtoggleMedicationDenied = async (DeniedRequiredMedication: boolean) => {
  const toggleLabels = page.locator('div[col-id="isApproved"] > div > label.switchToggle.changedrugstatus');
  const toggleCount = await toggleLabels.count();
  //console.log("Toggle count:", toggleCount);

  for (let i = 0; i < toggleCount; i++) {
    const toggleLabel = toggleLabels.nth(i);
    const checkbox = toggleLabel.locator('input[type="checkbox"]');

    // Check if the checkbox is checked (i.e., toggle is ON)
    const isChecked = await checkbox.isChecked();
    //console.log(`Toggle ${i + 1} is ${isChecked ? 'ON' : 'OFF'}`);

    if (isChecked) {
      //console.log(`Clicking to turn OFF toggle ${i + 1}`);
      await toggleLabel.click();
      await page.waitForTimeout(500);
    }
  }
  };
  await page.waitForTimeout(1000);
  await ROtoggleMedicationDenied(false);
  await page.waitForTimeout(3000);



  
    // //Save
    // await page.locator('[id="savebtnClick"]').click();
    // await page.waitForTimeout(3000); 

    //Determination: Date
    await page.locator('input[id="dendetrecondate"]').click();
    await page.waitForTimeout(1000); 
    await page.locator('td[class="today day"]').click();
    await page.waitForTimeout(1500); 

    //Determination: Reason 
    await page.locator('span[aria-labelledby="select2-denialreasondrp-container"]').click();
    await page.waitForTimeout(1000); 
    await page.locator('li[class="select2-results__option"]').nth(2).click();
    await page.waitForTimeout(1000); 

    await page.locator('button[id="PAdenial"]').click();
    await page.waitForTimeout(3000); 

     const OrderDenied = true; 
      if (OrderDenied) {
          console.log("✅ Order was successfully denied. ");
      } else {
          console.log("❌ Order has been denied. ");
      }

      console.log("");
      console.log("\x1b[1mOrder Appeal:\x1b[0m"); 

      //Close / Appeal Order
    await page.locator('input[name="denialver"]').nth(1).click();
    await page.waitForTimeout(1000); 

    await page.locator('button[id="PAappeal"]').click();
    await page.waitForTimeout(1000); 

    await page.locator('div[class="card-head"]').nth(25).click();
    await page.waitForTimeout(3000); 

    //Appeal Submission : Third Payer Portal
    await page.locator('span[aria-labelledby="select2-APsubmissionmethod-container"]').click();
    await page.locator('li[class="select2-results__option"]').nth(4).click();
    await page.waitForTimeout(1000);

    await page.locator('span[aria-labelledby="select2-APthirdpayerportal-container"]').click();
    await page.waitForTimeout(1000);
    await page.locator('li[class="select2-results__option"]').nth(4).click();
    await page.waitForTimeout(3000);

    await page.locator('input[name="Refno"]').nth(1).fill('101010');
    await page.waitForTimeout(1000); 

    await page.locator('input[id="APAuthReqOn"]').click();
    await page.waitForTimeout(1000); 
    await page.locator('td[class="today day"]').click();
    await page.waitForTimeout(1500);  

    await page.locator('button[id="APorderdetermination"]').click();
    await page.waitForTimeout(3000); 
   

  //     const toggleMedicationDeniedAp = async (DeniedRequiredMedication) => 
  //   {
  //   const MedicationToggleButtons = page.locator('div[col-id="isApproved"] > div > label[class="switchToggle changedrugstatus"]');
  //   const toggleCountMedication = await MedicationToggleButtons.count();
  
  //   for (let i = 0; i < toggleCountMedication; i++) 
  //   {
  //     const toggleButtonMedication = MedicationToggleButtons.nth(i);
  //    // console.log('toggleButtonMedication' + toggleButtonMedication);
  //     await toggleButtonMedication.click();

  //     await page.waitForTimeout(1000); 

  //      const isActive = await toggleButtonMedication.getAttribute('class') ?? '';
    
  //   if (isActive.includes('active')) {

  //     await toggleButtonMedication.click(); // Turn off the toggle if it's on
  //   } else {
  //     //console.log('Toggle is already OFF');
  //   }
  //     await page.waitForTimeout(1000); 
  //   }
  // }
  //   await page.waitForTimeout(1000); 
  //   await toggleMedicationDeniedAp(false); // Call with 'false' if approval is not required
  //   await page.waitForTimeout(3000); 
  



     
        //Determination: Date
      await page.locator('input[id="APdendetrecondate"]').click();
      await page.waitForTimeout(1000); 
      await page.locator('td[class="today day"]').click();
      await page.waitForTimeout(1500); 

      //Determination: Reason 
      await page.locator('span[aria-labelledby="select2-APdenialreasondrp-container"]').click();
      await page.waitForTimeout(1000); 
      await page.locator('li[class="select2-results__option"]').nth(9).click();
      await page.waitForTimeout(1000); 

      //Determination: Remarks
      await page.locator('div > textarea[id="APremarks"]').fill('NA');
      await page.waitForTimeout(1000); 

      //Close order
      await page.locator('input[name="EHRverclose"]').nth(1).click();
      await page.waitForTimeout(3000); 

      await page.locator('button[id="APPAdenial"]').click();
      await page.waitForTimeout(3000);  

      const OrderAppeal = true; 
      if (OrderAppeal) {
          console.log("✅ Order appeal has been submitted successfully. ");
      } else {
          console.log("❌ Order appeal failed. Please check the appeal conditions or data. ");
      }
 

       //Close Confirmation
      await page.locator('a[id="closebtnClick"]').nth(0).click();
      await page.waitForTimeout(3000);

      
    console.log("");
    console.log("\x1b[1mOrder Details Verification:\x1b[0m"); 
    console.log("📦 Navigating to order details page...");
    
      //Orders to searchbar
      await page.locator('a[href="/orders"]').click();

      //EPA Search From All Orders
      await page.locator('div> a[id="orderDropdownMenuLink"]').click();
      await page.waitForTimeout(1000);
      await page.locator('li> button[data-filtertype="AllOrder"]').click();
      await page.waitForTimeout(1000);

      //Search Bar
      await page.locator('input[placeholder="Press Enter To Search"]').click();
      await page.waitForTimeout(1000);  
      await page.locator('input[placeholder="Press Enter To Search"]').fill(inputMRN);
      await page.waitForTimeout(1000);  
      //Press Enter
      await page.locator('input[placeholder="Press Enter To Search"]').press('Enter');
      await page.waitForTimeout(1000); 
      // await page.locator(`a[title="Click to view order details"]:has-text("${inputMRN}")`).click();
      // await page.waitForTimeout(1000); 

      
      
   await page.waitForSelector('span.ag-cell-value', { timeout: 5000 }); 

  const Grid_MRN = await page.locator('span[class="ag-cell-value"]').nth(0).innerText();
  const Grid_PatientName = await page.locator('div[col-id="patientName"]').nth(1).innerText();
  const Grid_AssignedTo = await page.locator('div[col-id="assignee"]').nth(1).innerText();
  const Grid_Categorization = await page.locator('div[col-id="specialty"]').nth(1).innerText();
  const Grid_Status = await page.locator('div[col-id="status"]').nth(1).innerText();
  const Grid_Outcome = await page.locator('div[col-id="outcome"]').nth(1).innerText();

  await page.evaluate(() => {
  const container = document.querySelector('.ag-center-cols-viewport');
  if (container) {
    container.scrollLeft = container.scrollWidth;
  }
  });
    await page.waitForTimeout(1000);

  const Grid_PrimaryPayer = await page.locator('div[col-id="primaryPayer"]').nth(1).innerText();
  const Grid_CreatedDate = await page.locator('div[col-id="createdAt"]').nth(1).innerText();
  const Grid_CreatedBy = await page.locator('div[col-id="createdBy"]').nth(1).innerText();

  if (
    inputMRN.trim() == Grid_MRN.trim() &&
    fullName.trim() == Grid_PatientName.trim() &&
    AssignedTo.trim() == Grid_AssignedTo.trim() &&
    Categorization == Grid_Categorization.trim() &&
    Status.trim() == Grid_Status.trim() &&
    Outcome.trim() == Grid_Outcome.trim() &&
    PayerName == Grid_PrimaryPayer.trim() &&
    CreatedDate == Grid_CreatedDate.trim() &&
    CreatedBy.trim() == Grid_CreatedBy.trim()    

   )
  // {
  //   console.log("Patient Details Matched Successfully!");
  // } else {
  //   console.log("Patient Details do not match!");
  // }

  {
        console.log("✅ All order fields verified successfully.");

          const verificationUrl = await page.url();
          const clickableVer = '<a href="' + verificationUrl + '" target="_blank">Verification Details</a>';
          addResult({
            srNo: '5',
            module: 'Order Processing - Verification Details',
            status: 'Pass',
            URL: clickableVer
          });

    } else {
        console.log("❌ Order field verification failed. One or more fields have incorrect or missing values.");

        const failedVerificationUrl = await page.url();
        const clickableVer = '<a href="' + failedVerificationUrl + '" target="_blank">Verification Details</a>';
        addResult({
          srNo: '5',
          module: 'Order Processing - Verification Details',
          status: 'Fail',
          URL: clickableVer
  });
    }

   //await sendMail(testResults);
        
      //Orders to searchbar
      await page.locator('a[href="/orders"]').click();

      //EPA Search From All Orders
      await page.locator('div> a[id="orderDropdownMenuLink"]').click();
      await page.waitForTimeout(1000);
      await page.locator('li> button[data-filtertype="AllOrder"]').click();
      await page.waitForTimeout(1000);

      //Search Bar
      await page.locator('input[placeholder="Press Enter To Search"]').click();
      await page.waitForTimeout(1000);  
      await page.locator('input[placeholder="Press Enter To Search"]').fill(inputMRN);
      await page.waitForTimeout(1000);  
      //Press Enter
      await page.locator('input[placeholder="Press Enter To Search"]').press('Enter');
      await page.waitForTimeout(1000); 
      await page.locator(`a[title="Click to view order details"]:has-text("${inputMRN}")`).click();
      await page.waitForTimeout(1000); 


        console.log("");
        console.log("\x1b[1mOrder History Verification:\x1b[0m"); 
        console.log("📦 Navigating to order page...");
      
        const Workflow1 = "UnAssigned";
        const Workflow2 = "BenefitsVerification";
        const Workflow3 = "PARequired";
        const Workflow4 = "PASubmitted";
        const Workflow5 = "AP-Pending";
        const Workflow6 = "AP-Submitted";   
        const Workflow7 = "AP-Denied";

        const Outcome1 = "NewOrder";
        const Outcome2 = "InProgress";
        const Outcome3 = "Closed";
        // const AssignedTo = 'Foram Amin';
        // const CreatedBy = 'Foram Amin';
       
        const Order_MRN = await page.locator('input[name="MRN"]').inputValue();
        //console.log(Order_MRN);
        const Order_FirstName = await page.locator('input[name="firstName"]').inputValue();
        //console.log(Order_FirstName);
        const Order_Middle = await page.locator('input[id="middlepatientName"]').inputValue();
        //console.log(Order_Middle);
        const Order_LastName = await page.locator('input[id="lastpatientName"]').inputValue();
        //console.log(Order_LastName);
        const Order_DOB = await page.locator('input[name="patientdob"]').inputValue();
        //console.log(Order_DOB);
        const Order_Gender = await page.locator('span[id="select2-gender-container"]').innerText();
        //console.log(Order_Gender);
        const Order_Address = await page.locator('input[id="address"]').inputValue();
        //console.log(Order_Address);
        const Order_City = await page.locator('input[id="city"]').inputValue();
        //console.log(Order_City);
        // const Order_State = await page.locator('.select2-selection__rendered').nth(2).innerText();
        // //console.log(Order_State);
        const Order_Zipcode = await page.locator('input[id="zip"]').inputValue();
        //console.log(Order_Zipcode);
        const Order_ContactNo = await page.locator('input[id="contactnumber"]').inputValue();
        //console.log(Order_ContactNo);
        const Order_DOS = await page.locator('input[id="DOSStart"]').inputValue();
        //console.log(Order_DOS);
        const Order_PayerName = await page.locator('div[col-id="name"]').nth(1).innerText();
        //console.log(Order_PayerName);
        const Order_MemberID = await page.locator('div[col-id="policyNumber"]').nth(1).innerText();
        //console.log(Order_MemberID);
        const Order_Relationship = await page.locator('div[col-id="relationshipToPatient"]').nth(1).innerText();
        //console.log(Order_Relationship);
        const Order_HolderName = await page.locator('div[col-id="holderName"]').nth(1).innerText();
        //console.log(Order_HolderName);
        const Order_HolderDOB = await page.locator('div[col-id="holderDOB"]').nth(1).innerText();
        //console.log(Order_HolderDOB);
        const Order_PhysicianDate = await page.locator('input[id="datereq"]').inputValue();
        //console.log(Order_PhysicianDate);
        const Order_ReceivedDate = await page.locator('input[id="daterec"]').inputValue();
        //console.log(Order_ReceivedDate);
        const Order_RequestDate = await page.locator('input[id="pastartdate"]').inputValue();
        //console.log(Order_RequestDate);
        const Order_POS = await page.locator('span[id="select2-placeOfService-container"]').innerText();
        //console.log(Order_POS);
        const Order_Location = await page.locator('span[id="select2-userLocationId-container"]').innerText();
        //console.log(Order_Location);
        const Order_Categorization = await page.locator('span[id="select2-specialt-container"]').innerText();
        //console.log(Order_Categorization);
        const Order_Stat = await page.locator('span[id="select2-stat-container"]').innerText();
        //console.log(Order_Stat);
        const Order_ReqFN = await page.locator('span[id="select2-reqProvider-container"]').innerText();  //EPA DEV
        //console.log(Order_ReqFN);
        const Order_ReqLN = await page.locator('input[id="reqLastname"]').inputValue();
        //console.log(Order_ReqLN);
        // const Order_ReqTitle = await page.locator('input[id="reqTitle"]').inputValue();
        // //console.log(Order_ReqTitle);
        const Order_ReqNPI = await page.locator('input[id="reqnpi"]').inputValue();
        //console.log(Order_ReqNPI);
        const Order_ReqSpecialty = await page.locator('input[id="reqspeciality"]').inputValue();
        //console.log(Order_ReqSpecialty);
        const Order_ReqContact = await page.locator('input[id="reqcontact"]').inputValue();
        //console.log(Order_ReqContact);
        const Order_ReqAddress = await page.locator('input[id="reqAddress"]').inputValue();
        //console.log(Order_ReqAddress);
        const Order_RenFN = await page.locator('span[id="select2-renProvider-container"]').innerText();
        //console.log(Order_RenFN);
        const Order_RenLN = await page.locator('input[id="serLastname"]').inputValue();
        //console.log(Order_RenLN);
        // const Order_RenTitle = await page.locator('input[id="serTitle"]').inputValue();
        // //console.log(Order_RenTitle);
        const Order_RenNPI = await page.locator('input[id="sernpi"]').inputValue();
        //console.log(Order_RenNPI);
        const Order_RenSpecialty = await page.locator('input[id="serspeciality"]').inputValue();
        //console.log(Order_RenSpecialty);
        const Order_RenContact = await page.locator('input[id="sercontact"]').inputValue();
        //console.log(Order_RenContact);
        const Order_RenAddress = await page.locator('input[id="serAddress"]').inputValue();
        //console.log(Order_RenAddress);
        const Order_RFLegalname = await page.locator('input[id="facname"]').inputValue();
        //console.log(Order_RFLegalname);
        // const Order_RFGroupTax = await page.locator('input[id="factaxid"]').inputValue();
        // //console.log(Order_RFGroupTax);
        const Order_RFNPI = await page.locator('input[id="facgroupnpi"]').inputValue();
        //console.log(Order_RFNPI);
        // const Order_RFFax = await page.locator('input[id="facfaxno"]').inputValue();
        // //console.log(Order_RFFax);
        // const Order_RFContact = await page.locator('input[id="faccontact"]').inputValue();
        // //console.log(Order_RFContact);
        const Order_RFAddress = await page.locator('input[id="facaddress"]').inputValue();
        //console.log(Order_RFAddress);

        const Order_MedDrugName = await page.locator('div[col-id="drugName"]').nth(1).innerText();
        //console.log(Order_MedDrugName);
        const Order_Meddosage = await page.locator('div[col-id="dose"]').nth(1).innerText();
        //console.log(Order_Meddosage);
        const Order_MedCPT = await page.locator('div[col-id="cpthcpcsCode"]').nth(1).innerText();
        //console.log(Order_MedCPT);
        const Order_MedDXCode = await page.locator('div[col-id="primaryDXCode"]').nth(1).innerText();
        //console.log(Order_MedDXCode);
        const Order_MedDoseUnit = await page.locator('div[col-id="strengthToBeGiven"]').nth(1).innerText();
        //console.log(Order_MedDoseUnit);
        const Order_MedFrequency = await page.locator('div[col-id="frequency"]').nth(1).innerText();
        //console.log(Order_MedFrequency);
        const Order_MedQuantity = await page.locator('div[col-id="quantity"]').nth(1).innerText();
        //console.log(Order_MedQuantity);
        const Order_MedCycle = await page.locator('div[col-id="cycle"]').nth(1).innerText();
        //console.log(Order_MedCycle);
        const Order_MedDOS = await page.locator('div[col-id="dateOfServiceStart"]').nth(1).innerText();
        //console.log(Order_MedDOS);

        const Order_MedDrug1 = await page.locator('div[col-id="drugName"]').nth(2).innerText();
        //console.log(Order_MedDrug1);
        const Order_Meddose1 = await page.locator('div[col-id="dose"]').nth(2).innerText();
        //console.log(Order_Meddose1);
        const Order_MedCPT1 = await page.locator('div[col-id="cpthcpcsCode"]').nth(2).innerText();
        //console.log(Order_MedCPT1);
        const Order_MedDXCode1 = await page.locator('div[col-id="primaryDXCode"]').nth(2).innerText();
        //console.log(Order_MedDXCode1);
        const Order_MedDoseUnit1 = await page.locator('div[col-id="strengthToBeGiven"]').nth(2).innerText();
        //console.log(Order_MedDoseUnit1);
        const Order_MedFrequency1 = await page.locator('div[col-id="frequency"]').nth(2).innerText();
        //console.log(Order_MedFrequency1);
        const Order_MedQuantity1 = await page.locator('div[col-id="quantity"]').nth(2).innerText();
        //console.log(Order_MedQuantity1);
        const Order_MedCycle1 = await page.locator('div[col-id="cycle"]').nth(2).innerText();
        //console.log(Order_MedCycle1);
        const Order_MedDOS1 = await page.locator('div[col-id="dateOfServiceStart"]').nth(2).innerText();
        //console.log(Order_MedDOS1);

        const Order_ProceduresDrugName = await page.locator('div[col-id="procedureName"]').nth(1).innerText();
        //console.log(Order_ProceduresDrugName);
        const Order_ProceduresCPT = await page.locator('div[col-id="cpthcpcsCode"]').nth(4).innerText();
        //console.log(Order_ProceduresCPT);
        const Order_ProceduresDXCode = await page.locator('div[col-id="primaryDXCode"]').nth(4).innerText();
        //console.log(Order_ProceduresDXCode);
        // const Order_ProceduresQuantity = await page.locator('div[col-id="quantity"]').nth(4).innerText();
        // //console.log(Order_ProceduresQuantity);
        const Order_ProceduresDOS = await page.locator('div[col-id="dateOfServiceStart"]').nth(1).innerText();
        //console.log(Order_ProceduresDOS);

        const Order_BV = await page.locator('span[id="select2-PAprocess-container"]').innerText();
        //console.log(Order_BV);
        const Order_TypeOfReview = await page.locator('input[id="PARequired"]').inputValue();
        //console.log(Order_TypeOfReview);
        const Order_PA = await page.locator('#select2-submissionmethod-container').textContent();
        //console.log(Order_PA);
        const Order_PAFAX = await page.locator('input[id="faxnumber"]').inputValue();
        //console.log(Order_PAFAX);
        const Order_PARef = await page.locator('input[id="Refno"]').inputValue();
        //console.log(Order_PARef);
        const Order_PAAuthRequested = await page.locator('input[id="AuthReqOn"]').inputValue();
        //console.log(Order_PAAuthRequested);
        const Order_DeterminationRec = await page.locator('input[id="dendetrecondate"]').inputValue();
        //console.log(Order_DeterminationRec);
        const Order_DenialReason = await page.locator('span[id="select2-denialreasondrp-container"]').innerText();
        //console.log(Order_DenialReason);
        const Order_APSubmissionMethod = await page.locator('span[id="select2-APsubmissionmethod-container"]').innerText();
        //console.log(Order_APSubmissionMethod);
        const Order_APThirdPP = await page.locator('span[id="select2-APthirdpayerportal-container"]').innerText();
        //console.log(Order_APThirdPP);
        const Order_APRefNo = await page.locator('input[id="APRefno"]').inputValue();
        //console.log(Order_APRefNo);
        const Order_APSubmitted = await page.locator('input[id="APAuthReqOn"]').inputValue();
        //console.log(Order_APSubmitted);
        const Order_APDetRec = await page.locator('input[id="APdendetrecondate"]').inputValue();
        //console.log(Order_APDetRec);
        const Order_APDenialReason = await page.locator('span[id="select2-APdenialreasondrp-container"]').innerText();
        //console.log(Order_APDenialReason);
        const Order_APRemarks = await page.locator('textarea#APremarks').textContent();
        //console.log(Order_APRemarks);




      await page.locator('a[id="historyModal"]').click();
      await page.waitForTimeout(1500);
      
   // await page.waitForSelector('span.ag-cell-value', { timeout: 5000 }); 
      await page.locator('span[class="right-span"]').click();
      await page.waitForTimeout(1500);


    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Patient MRN', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_MRN = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_MRN);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Patient First Name', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_FirstName = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_FirstName);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Patient Middle Initial', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_Middle = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_Middle);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Patient Last Name', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_LastName = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_LastName);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('DateOfBirth', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_DOB = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_DOB);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Patient Gender', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_Gender = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_Gender);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Patient Address1', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_Address = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_Address);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Patient City', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_City = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_City);
    // await page.locator('a[class="btn submit"]').nth(0).click();
    // await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Patient State', { delay: 30 });
    // await page.waitForTimeout(1000); 
    // const History_State = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    // //console.log(History_State);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Patient Zip', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_Zip = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_Zip);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Patient Mobile Phone', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_ContactNo = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_ContactNo);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Date of service', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_DOS = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_DOS);
    await page.locator('[data-filtertype="Insurance"]').click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Payer Name', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_PayerName = await page.locator('div[col-id="newValue"]').nth(4).innerText();
    //console.log(History_PayerName);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Policy Number', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_MemberID = await page.locator('div[col-id="newValue"]').nth(4).innerText();
    //console.log(History_MemberID);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Patient Relationship to Holder', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_Relation = await page.locator('div[col-id="newValue"]').nth(4).innerText();
    //console.log(History_Relation);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Holder Name', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_HolderName = await page.locator('div[col-id="newValue"]').nth(4).innerText();
    //console.log(History_HolderName);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Holder Date Of Birth', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_HolderDOB = await page.locator('div[col-id="newValue"]').nth(4).innerText();
    //console.log(History_HolderDOB);



    await page.locator('button[data-filtertype="Order"]').click(); //Orders
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Physician Order date', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_PhysicianOrderdate = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_PhysicianOrderdate);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Order received date', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_Orderreceiveddate = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_Orderreceiveddate);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Prior Auth Start Date', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_RequestedDate = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_RequestedDate);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Place Of Service', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_POS = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_POS);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Location', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_Location = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_Location);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Categorization', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_Categorization = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_Categorization);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Requesting Provider First Name', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_ReqFN = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_ReqFN);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Requesting Provider LastName', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_ReqLN = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_ReqLN);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Requesting Provider NPI', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_ReqNPI = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_ReqNPI);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Requesting Provider Specialty', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_ReqSpecialty = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_ReqSpecialty);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Requesting Provider Phone', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_ReqContactNo = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_ReqContactNo);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Requesting Provider Address', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_ReqAddress = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_ReqAddress);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Rendering Provider FirstName', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_RenFN = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_RenFN);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Rendering Provider LastName', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_RenLN = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_RenLN);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Rendering Provider NPI', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_RenNPI = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_RenNPI);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Rendering Provider Specialty', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_RenSpecialty = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_RenSpecialty);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Rendering Provider Phone', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_RenContact = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_RenContact);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Rendering Provider Address', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_RenAddress = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_RenAddress);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Rendering Facility LegalName', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_RFLegalname = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log('History_RFLegalname:',History_RFLegalname);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Rendering Facility GroupNPI', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_RFNPI = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log('History_RFNPI: ',History_RFNPI);
    // await page.locator('a[class="btn submit"]').nth(0).click();
    // await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Rendering Facility GroupTax', { delay: 30 });
    // await page.waitForTimeout(1000); 
    // const History_RenTax = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    // //console.log(History_RenTax);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Rendering Facility Address', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_RFAddress = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_RFAddress);

       await page.locator('button[data-filtertype="Medication"]').click(); //Medications
    await page.locator('span[title="Select"]').click();
    await page.locator('span[title="Select"]').pressSequentially('RITUXAN', { delay: 30 });
    //await page.locator('div[class="select2-result-repository__title"]').nth(2).click(); //RITUXAN (J9312)
    await page.locator('div[class="select2-result-repository__title"]').click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Drug Name', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_MedDrugName1 = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    //console.log(History_MedDrugName1);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Dose', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_MedDose1 = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    //console.log('History_MedDose1: ',History_MedDose1);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('CPT/HCPCS', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_MedCPT1 = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    //console.log('History_MedCPT1:',History_MedCPT1);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Primary DX Code', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_MedDXCode1 = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    //console.log(History_MedDXCode1);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Dose To Be Given', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_MedDoseUnit1 = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    //console.log(History_MedDoseUnit1);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Frequency', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_MedFrequency1 = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    //console.log(History_MedFrequency1);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Quantity', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_MedQuantity1 = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    //console.log(History_MedQuantity1);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Cycle', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_MedCycle1 = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    //console.log(History_MedCycle1);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Date of service', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_MedDOS1 = await page.locator('div[col-id="newValue"]').nth(3).innerText();
    //console.log(History_MedDOS1);
   await page.locator('#medicationdrp > span').click();
    await page.locator('input[type="search"]').click();
    await page.locator('input[type="search"]').pressSequentially('Cyclophosphamide', { delay: 30 });
    await page.locator('div[class="select2-result-repository__title"]').click();
    //await page.locator('div[class="select2-result-repository__title"]').nth(1).click(); //Cyclophosphamide (J9070)
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Drug Name', { delay: 50 });
    await page.waitForTimeout(1000); 
    const History_MedDrugName = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    //console.log('History_MedDrugName:',History_MedDrugName);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Dose', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_MedDose = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    //console.log('History_MedDose: ',History_MedDose);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('CPT/HCPCS', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_MedCPT = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    //console.log('History_MedCPT:',History_MedCPT);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Primary DX Code', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_MedDXCode = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    //console.log(History_MedDXCode);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Dose To Be Given', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_MedDoseUnit = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    //console.log(History_MedDoseUnit);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Frequency', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_MedFrequency = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    //console.log(History_MedFrequency);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Quantity', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_MedQuantity = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    //console.log(History_MedQuantity);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Cycle', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_MedCycle = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    //console.log(History_MedCycle);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Date of service', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_MedDOS = await page.locator('div[col-id="newValue"]').nth(3).innerText();
    //console.log(History_MedDOS);


    await page.locator('button[data-filtertype="Procedure"]').click(); //Procedures 
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Procedure Name', { delay: 50 });
    await page.waitForTimeout(1000); 
    const History_ProcedureName = await page.locator('div[col-id="newValue"]').nth(3).innerText();
    //console.log(History_ProcedureName);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('CPT/HCPCS', { delay: 50 });
    await page.waitForTimeout(1000); 
    const History_ProcedureCPT = await page.locator('div[col-id="newValue"]').nth(4).innerText();
    //console.log(History_ProcedureCPT);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Primary DX Code', { delay: 50 });
    await page.waitForTimeout(1000); 
    const History_ProcedureDXCode = await page.locator('div[col-id="newValue"]').nth(4).innerText();
    //console.log(History_ProcedureDXCode);
    // await page.locator('a[class="btn submit"]').nth(0).click();
    // await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Quantity', { delay: 70 });
    // await page.waitForTimeout(1000); 
    // const History_ProcedureQuantity = await page.locator('div[col-id="newValue"]').nth(3).innerText();
    // //console.log(History_ProcedureQuantity);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Date of service', { delay: 50 });
    await page.waitForTimeout(1000); 
    const History_ProcedureDOS = await page.locator('div[col-id="newValue"]').nth(3).innerText();
    //console.log(History_ProcedureDOS);
    await page.locator('button[data-filtertype="Order"]').click(); //Orders
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Benefits Verification Verification Method', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_BV = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_BV);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Benefits Verification Review Type', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_TypeOfReview = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_TypeOfReview);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('PA Submission Fax Number', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_PAFAX = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_PAFAX);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('PA Submission Reference No', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_PARef = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_PARef);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Auth requested on', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_PARequestDate = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_PARequestDate);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Determination Denial Received On Date', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_DeterminationRec = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_DeterminationRec);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Determination Denial Denial Reason', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_DenialReason = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    //console.log(History_DenialReason);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Appeal Submission Method Type', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_AppealSubmission = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_AppealSubmission);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Appeal Submission Third Party Portal', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_APThirdPP = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    //console.log(History_APThirdPP);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Appeal Submission Reference No', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_AppealRefNo = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_AppealRefNo);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Appeal Auth requested on', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_AppealAuthrequested = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_AppealAuthrequested);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Appeal Determination Denial Received On Date', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_APDetRec = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_APDetRec);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Appeal Determination Denial Reason', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_APReason = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_APReason);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Appeal Determination Denial Remark', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_APRemark = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_APRemark);

    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Workflow Status', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_Workflow1 = await page.locator('div[col-id="newValue"]').nth(7).innerText();
    //console.log(History_Workflow1);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Workflow Status', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_Workflow2 = await page.locator('div[col-id="newValue"]').nth(6).innerText();
    //console.log(History_Workflow2);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Workflow Status', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_Workflow3 = await page.locator('div[col-id="newValue"]').nth(5).innerText();
    //console.log(History_Workflow3);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Workflow Status', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_Workflow4 = await page.locator('div[col-id="newValue"]').nth(4).innerText();
    //console.log(History_Workflow4);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Workflow Status', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_Workflow5 = await page.locator('div[col-id="newValue"]').nth(3).innerText();
    //console.log(History_Workflow5);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Workflow Status', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_Workflow6 = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    //console.log(History_Workflow6);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Workflow Status', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_Workflow7 = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_Workflow7);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Outcome', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_Outcome1 = await page.locator('div[col-id="newValue"]').nth(3).innerText();
    //console.log(History_Outcome1);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Outcome', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_Outcome2 = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    //console.log(History_Outcome2);
      await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Outcome', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_Outcome3 = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    //console.log(History_Outcome3);














  //    if (
  //   Order_MRN.trim() == History_MRN.trim() &&
  //   Order_FirstName.trim() == History_FirstName.trim() &&
  //   Order_Middle.trim() == History_Middle.trim() &&
  //   Order_LastName.trim() == History_LastName.trim() &&
  //   Order_DOB.trim() == History_DOB.trim() &&
  //   Order_Gender.trim() == History_Gender.trim() &&
  //   Order_Address.trim() == History_Address.trim() &&
  //   Order_City.trim() == History_City.trim() &&
  //   Order_State.trim() == History_State.trim() &&
  //   Order_Zipcode.trim() == History_Zip.trim() &&
  //   Order_ContactNo.trim() == History_ContactNo.trim() &&
  //   Order_DOS.trim() == History_DOS.trim() &&
  //   Order_PayerName.trim() == History_PayerName.trim() &&
  //   Order_MemberID.trim() == History_MemberID.trim() 

  //   )
  // {
  //   console.log("Patient Details Matched Successfully!");
  // } else {
  //   console.log("Patient Details do not match!");
  // }


        const clean = (v: any) => {
    if (!v) return "";
    return String(v)
        .replace(/\u200b|\u00A0|\ufeff/g, "")
        .replace(/00:00:00/g, "")
        .replace(/[,\t]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();
    };
          const fieldsToCompare: [string, any, any][] = [
      ["MRN", Order_MRN, History_MRN],
      ["First Name", Order_FirstName, History_FirstName],
      ["Middle Name", Order_Middle, History_Middle],
      ["Last Name", Order_LastName, History_LastName],
      ["DOB", Order_DOB, History_DOB],
      ["Gender", Order_Gender, History_Gender],
      ["Address", Order_Address, History_Address],
      ["City", Order_City, History_City],
      // ["State", Order_State, History_State],
      ["Zipcode", Order_Zipcode, History_Zip],
      ["Contact No", Order_ContactNo, History_ContactNo],
      ["DOS", Order_DOS, History_DOS],
      ["Payer Name", Order_PayerName, History_PayerName],
      ["Member ID", Order_MemberID, History_MemberID],
      ["Relationship", Order_Relationship, History_Relation],
      ["Holder Name", Order_HolderName, History_HolderName],
      ["Holder DOB", Order_HolderDOB, History_HolderDOB],
      ["Physician Date", Order_PhysicianDate, History_PhysicianOrderdate],
      ["Received Date", Order_ReceivedDate, History_Orderreceiveddate],
      ["POS", Order_POS, History_POS],
      ["Location", Order_Location, History_Location],
      ["Categorization", Order_Categorization, History_Categorization],
      ["Request Date", Order_RequestDate, History_RequestedDate],
      ["Req First Name", Order_ReqFN, History_ReqFN],
      ["Req Last Name", Order_ReqLN, History_ReqLN],
      ["Req NPI", Order_ReqNPI, History_ReqNPI],
      ["Req Specialty", Order_ReqSpecialty, History_ReqSpecialty],
      ["Req Contact", Order_ReqContact, History_ReqContactNo],
      ["Req Address", Order_ReqAddress, History_ReqAddress],
      ["Ren First Name", Order_RenFN, History_RenFN],
      ["Ren Last Name", Order_RenLN, History_RenLN],
      ["Ren NPI", Order_RenNPI, History_RenNPI],
      ["Ren Specialty", Order_RenSpecialty, History_RenSpecialty],
      ["Ren Contact", Order_RenContact, History_RenContact],
      ["Ren Address", Order_RenAddress, History_RenAddress],
      ["RF Legal Name", Order_RFLegalname, History_RFLegalname],
      ["RF NPI", Order_RFNPI, History_RFNPI],
      ["RF Address", Order_RFAddress, History_RFAddress],

      ["Med Drug1", Order_MedDrugName, History_MedDrugName1],
      ["Med Dose1", Order_Meddosage, History_MedDose1],
      ["Med CPT1", Order_MedCPT, History_MedCPT1],
      ["Med DX Code1", Order_MedDXCode, History_MedDXCode1],
      ["Med Dose Unit1", Order_MedDoseUnit, History_MedDoseUnit1],
      ["Med Frequency1", Order_MedFrequency, History_MedFrequency1],
      ["Med Quantity1", Order_MedQuantity, History_MedQuantity1],
      ["Med Cycle1", Order_MedCycle, History_MedCycle1],
      ["Med DOS1", Order_MedDOS, History_MedDOS1],

      ["Med Drug", Order_MedDrug1, History_MedDrugName],
      ["Med Dosage", Order_Meddose1, History_MedDose],
      ["Med CPT", Order_MedCPT1, History_MedCPT],
      ["Med DX Code", Order_MedDXCode1, History_MedDXCode],
      ["Med Dose Unit", Order_MedDoseUnit1, History_MedDoseUnit],
      ["Med Frequency", Order_MedFrequency1, History_MedFrequency],
      ["Med Quantity", Order_MedQuantity1, History_MedQuantity],
      ["Med Cycle", Order_MedCycle1, History_MedCycle],
      ["Med DOS", Order_MedDOS1, History_MedDOS],

      ["Procedure Name", Order_ProceduresDrugName, History_ProcedureName],
      ["Procedure CPT", Order_ProceduresCPT, History_ProcedureCPT],
      ["Procedure DX Code", Order_ProceduresDXCode, History_ProcedureDXCode],
      //["Procedure Quantity", Order_ProceduresQuantity, History_ProcedureQuantity], // commented as in your code
      ["Procedure DOS", Order_ProceduresDOS, History_ProcedureDOS],
      ["BV", Order_BV, History_BV],
      ["Type Of Review", Order_TypeOfReview, History_TypeOfReview],
      ["PA FAX", Order_PAFAX, History_PAFAX],
      ["PA Ref", Order_PARef, History_PARef],
      ["PA Auth Requested", Order_PAAuthRequested, History_PARequestDate],
      ["Determination Rec", Order_DeterminationRec, History_DeterminationRec],
      ["Denial Reason", Order_DenialReason, History_DenialReason],
      ["AP Submission Method", Order_APSubmissionMethod, History_AppealSubmission],
      ["AP Third PP", Order_APThirdPP, History_APThirdPP],
      ["AP Ref No", Order_APRefNo, History_AppealRefNo],
      ["AP Submitted", Order_APSubmitted, History_AppealAuthrequested],
      ["AP Det Rec", Order_APDetRec, History_APDetRec],
      ["AP Denial Reason", Order_APDenialReason, History_APReason],
      ["AP Remarks", Order_APRemarks, History_APRemark]
    ];


 let mismatches = [];

for (const [label, orderVal, histVal] of fieldsToCompare) {
    const o = clean(orderVal);
    const h = clean(histVal);

    if (o !== h) {
        mismatches.push(`❌ ${label} Mismatch  
  ORDER  : "${o}"  
  HISTORY: "${h}"`);
    }
}
  if (mismatches.length === 0) {
    console.log("✅ All order fields verified successfully.");

    const verificationUrl = await page.url();
    addResult({
        srNo: '6',
        module: 'Order History - Verification Details',
        status: 'Pass',
        URL: `<a href="${verificationUrl}" target="_blank">Verification Details</a>`
    });

} else {
    console.log("❌ Order field verification failed.");
    console.log("\n=== MISMATCH REPORT ===\n" + mismatches.join("\n\n"));

    const failedUrl = await page.url();
    addResult({
        srNo: '6',
        module: 'Order History - Verification Details',
        status: 'Fail',
        URL: `<a href="${failedUrl}" target="_blank">Verification Details</a>`
    });
}






//      const clean = (v: any) => {
//     if (!v) return "";
//     return String(v)
//     .replace(/\u200b|\u00A0|\ufeff/g, "")
//     .replace(/00:00:00/g, "")
//     .replace(/[,\t]/g, "")
//     .replace(/\s+/g, " ")
//     .trim()
//     .toLowerCase();
//   };

//   if (
//       clean(Order_MRN) === clean(History_MRN) &&
//       clean(Order_FirstName) === clean(History_FirstName) &&
//       clean(Order_Middle) === clean(History_Middle) &&
//       clean(Order_LastName) === clean(History_LastName) &&
//       clean(Order_DOB) === clean(History_DOB) &&
//       clean(Order_Gender) === clean(History_Gender) &&
//       clean(Order_Address) === clean(History_Address) &&
//       clean(Order_City) === clean(History_City) &&
//       clean(Order_Zipcode) === clean(History_Zip) &&
//       clean(Order_ContactNo) === clean(History_ContactNo) &&
//       clean(Order_DOS) === clean(History_DOS) &&
//       clean(Order_PayerName) === clean(History_PayerName) &&
//       clean(Order_MemberID) === clean(History_MemberID) &&
//      clean(Order_Relationship) === clean(History_Relation) &&
//      clean(Order_HolderName) === clean(History_HolderName) &&
//      clean(Order_HolderDOB) === clean(History_HolderDOB) &&
//      clean(Order_PhysicianDate) === clean(History_PhysicianOrderdate) &&
//      clean(Order_ReceivedDate) === clean(History_Orderreceiveddate) &&
//      clean(Order_POS) === clean(History_POS) &&
//      clean(Order_Location) === clean(History_Location) &&
//      clean(Order_Categorization) === clean(History_Categorization) &&
//      clean(Order_RequestDate) === clean(History_RequestedDate) &&
//      clean(Order_ReqFN) === clean(History_ReqFN) &&
//      clean(Order_ReqLN) === clean(History_ReqLN) &&
//      clean(Order_ReqNPI) === clean(History_ReqNPI) &&
//      clean(Order_ReqSpecialty) === clean(History_ReqSpecialty) &&
//      clean(Order_ReqContact) === clean(History_ReqContactNo) &&
//      clean(Order_ReqAddress) === clean(History_ReqAddress) &&
//      clean(Order_RenFN) === clean(History_RenFN) &&
//      clean(Order_RenLN) === clean(History_RenLN) &&
//      clean(Order_RenNPI) === clean(History_RenNPI) &&
//      clean(Order_RenSpecialty) === clean(History_RenSpecialty) &&
//      clean(Order_RenContact) === clean(History_RenContact) &&
//      clean(Order_RenAddress) === clean(History_RenAddress) &&
//      clean(Order_RFLegalname) === clean(History_RFLegalname) &&
//      clean(Order_RFNPI) === clean(History_RFNPI) &&
//      clean(Order_RFAddress) === clean(History_RFAddress) &&
//      clean(Order_MedDrugName) === clean(History_MedDrugName1) &&
//      clean(Order_Meddosage) === clean(History_MedDose1) &&
//      clean(Order_MedCPT) === clean(History_MedCPT1) &&
//      clean(Order_MedDXCode) === clean(History_MedDXCode1) &&
//      clean(Order_MedDoseUnit) === clean(History_MedDoseUnit1) &&
//      clean(Order_MedFrequency) === clean(History_MedFrequency1) &&
//      clean(Order_MedQuantity) === clean(History_MedQuantity1) &&
//      clean(Order_MedCycle) === clean(History_MedCycle1) &&
//      clean(Order_MedDOS) === clean(History_MedDOS1) &&
//       clean(Order_MedDrug1) === clean(History_MedDrugName) &&
//      clean(Order_Meddose1) === clean(History_MedDose) &&
//      clean(Order_MedCPT1) === clean(History_MedCPT) &&
//      clean(Order_MedDXCode1) === clean(History_MedDXCode) &&
//      clean(Order_MedDoseUnit1) === clean(History_MedDoseUnit) &&
//      clean(Order_MedFrequency1) === clean(History_MedFrequency) &&
//      clean(Order_MedQuantity1) === clean(History_MedQuantity) &&
//      clean(Order_MedCycle1) === clean(History_MedCycle) &&
//      clean(Order_MedDOS1) === clean(History_MedDOS) &&
//      clean(Order_ProceduresDrugName) === clean(History_ProcedureName) &&
//      clean(Order_ProceduresCPT) === clean(History_ProcedureCPT) &&
//      clean(Order_ProceduresDXCode) === clean(History_ProcedureDXCode) &&
//     // clean(Order_ProceduresQuantity) === clean(History_ProcedureQuantity) &&
//      clean(Order_ProceduresDOS) === clean(History_ProcedureDOS) &&
//      clean(Order_BV) === clean(History_BV) &&
//      clean(Order_TypeOfReview) === clean(History_TypeOfReview) &&
//      clean(Order_PAFAX) === clean(History_PAFAX) &&
//      clean(Order_PARef) === clean(History_PARef) &&
//      clean(Order_PAAuthRequested) === clean(History_PARequestDate) &&
//      clean(Order_DeterminationRec) === clean(History_DeterminationRec) &&
//      clean(Order_DenialReason) === clean(History_DenialReason) &&
//      clean(Order_APSubmissionMethod) === clean(History_AppealSubmission) &&
//      clean(Order_APThirdPP) === clean(History_APThirdPP) &&
//      clean(Order_APRefNo) === clean(History_AppealRefNo) &&
//      clean(Order_APSubmitted) === clean(History_AppealAuthrequested) &&
//      clean(Order_APDetRec) === clean(History_APDetRec) &&
//      clean(Order_APDenialReason) === clean(History_APReason) &&
//      clean(Order_APRemarks) === clean(History_APRemark) &&
//      clean(Workflow1) === clean(History_Workflow1) &&
//      clean(Workflow2) === clean(History_Workflow2) &&
//      clean(Workflow3) === clean(History_Workflow3) &&
//      clean(Workflow4) === clean(History_Workflow4) &&
//      clean(Workflow5) === clean(History_Workflow5) &&
//      clean(Workflow6) === clean(History_Workflow6) &&
//      clean(Workflow7) === clean(History_Workflow7) &&
//      clean(Outcome1) === clean(History_Outcome1) &&
//     clean(Outcome2) === clean(History_Outcome2) &&
//     clean(Outcome3) === clean(History_Outcome3) 




// //  ) {
// //   console.log("✅ Patient Details Matched Successfully!");
// // } else {
// //   console.log("❌ Patient Details do not match!");
// // }

//  ) {
//         console.log("✅ All order fields verified successfully.");

//           const verificationUrl = await page.url();
//           const clickableVer = '<a href="' + verificationUrl + '" target="_blank">Verification Details</a>';
//           addResult({
//             srNo: '6',
//             module: 'Order History - Verification Details',
//             status: 'Pass',
//             URL: clickableVer
//           });

//     } else {
//         console.log("❌ Order field verification failed. One or more fields have incorrect or missing values.");

//         const failedVerificationUrl = await page.url();
//         const clickableVer = '<a href="' + failedVerificationUrl + '" target="_blank">Verification Details</a>';
//         addResult({
//           srNo: '6',
//           module: 'Order History - Verification Details',
//           status: 'Fail',
//           URL: clickableVer
//         });
//     }
    


// // CLEAN FUNCTION (keep as is)
// const clean = (v: any) => {
//   if (!v) return "";
//   return String(v)
//     .replace(/\u200b|\u00A0|\ufeff/g, "")
//     .replace(/00:00:00/g, "")
//     .replace(/[,\t]/g, "")
//     .replace(/\s+/g, " ")
//     .trim()
//     .toLowerCase();
// };

// // ARRAY OF FIELDS TO COMPARE
// const fieldsToCompare: [string, any, any][] = [
//   ["MRN", Order_MRN, History_MRN],
//   ["First Name", Order_FirstName, History_FirstName],
//   ["Middle Name", Order_Middle, History_Middle],
//   ["Last Name", Order_LastName, History_LastName],
//   ["DOB", Order_DOB, History_DOB],
//   ["Gender", Order_Gender, History_Gender],
//   ["Address", Order_Address, History_Address],
//   ["City", Order_City, History_City],
//   // ["State", Order_State, History_State],
//   ["Zipcode", Order_Zipcode, History_Zip],
//   ["Contact No", Order_ContactNo, History_ContactNo],
//   ["DOS", Order_DOS, History_DOS],
//   ["Payer Name", Order_PayerName, History_PayerName],
//   ["Member ID", Order_MemberID, History_MemberID],
//   ["Relationship", Order_Relationship, History_Relation],
//   ["Holder Name", Order_HolderName, History_HolderName],
//   ["Holder DOB", Order_HolderDOB, History_HolderDOB],
//   ["Physician Date", Order_PhysicianDate, History_PhysicianOrderdate],
//   ["Received Date", Order_ReceivedDate, History_Orderreceiveddate],
//   ["POS", Order_POS, History_POS],
//   ["Location", Order_Location, History_Location],
//   ["Categorization", Order_Categorization, History_Categorization],
//   ["Request Date", Order_RequestDate, History_RequestedDate],
//   ["Req First Name", Order_ReqFN, History_ReqFN],
//   ["Req Last Name", Order_ReqLN, History_ReqLN],
//   ["Req NPI", Order_ReqNPI, History_ReqNPI],
//   ["Req Specialty", Order_ReqSpecialty, History_ReqSpecialty],
//   ["Req Contact", Order_ReqContact, History_ReqContactNo],
//   ["Req Address", Order_ReqAddress, History_ReqAddress],
//   ["Ren First Name", Order_RenFN, History_RenFN],
//   ["Ren Last Name", Order_RenLN, History_RenLN],
//   ["Ren NPI", Order_RenNPI, History_RenNPI],
//   ["Ren Specialty", Order_RenSpecialty, History_RenSpecialty],
//   ["Ren Contact", Order_RenContact, History_RenContact],
//   ["Ren Address", Order_RenAddress, History_RenAddress],
//   ["RF Legal Name", Order_RFLegalname, History_RFLegalname],
//   ["RF NPI", Order_RFNPI, History_RFNPI],
//   ["RF Address", Order_RFAddress, History_RFAddress],
//   ["Med Drug1", Order_MedDrugName, History_MedDrugName1],
//   ["Med Dose1", Order_Meddosage, History_MedDose1],
//   ["Med CPT1", Order_MedCPT, History_MedCPT1],
//   ["Med DX Code1", Order_MedDXCode, History_MedDXCode1],
//   ["Med Dose Unit1", Order_MedDoseUnit, History_MedDoseUnit1],
//   ["Med Frequency1", Order_MedFrequency, History_MedFrequency1],
//   ["Med Quantity1", Order_MedQuantity, History_MedQuantity1],
//   ["Med Cycle1", Order_MedCycle, History_MedCycle1],
//   ["Med DOS1", Order_MedDOS, History_MedDOS1],
//   ["Med Drug", Order_MedDrug1, History_MedDrugName],
//   ["Med Dosage", Order_Meddose1, History_MedDose],
//   ["Med CPT", Order_MedCPT1, History_MedCPT],
//   ["Med DX Code", Order_MedDXCode1, History_MedDXCode],
//   ["Med Dose Unit", Order_MedDoseUnit1, History_MedDoseUnit],
//   ["Med Frequency", Order_MedFrequency1, History_MedFrequency],
//   ["Med Quantity", Order_MedQuantity1, History_MedQuantity],
//   ["Med Cycle", Order_MedCycle1, History_MedCycle],
//   ["Med DOS", Order_MedDOS1, History_MedDOS],
//   ["Procedure Name", Order_ProceduresDrugName, History_ProcedureName],
//   ["Procedure CPT", Order_ProceduresCPT, History_ProcedureCPT],
//   ["Procedure DX Code", Order_ProceduresDXCode, History_ProcedureDXCode],
//   //["Procedure Quantity", Order_ProceduresQuantity, History_ProcedureQuantity], // commented as in your code
//   ["Procedure DOS", Order_ProceduresDOS, History_ProcedureDOS],
//   ["BV", Order_BV, History_BV],
//   ["Type Of Review", Order_TypeOfReview, History_TypeOfReview],
//   ["PA FAX", Order_PAFAX, History_PAFAX],
//   ["PA Ref", Order_PARef, History_PARef],
//   ["PA Auth Requested", Order_PAAuthRequested, History_PARequestDate],
//   ["Determination Rec", Order_DeterminationRec, History_DeterminationRec],
//   ["Denial Reason", Order_DenialReason, History_DenialReason],
//   ["AP Submission Method", Order_APSubmissionMethod, History_AppealSubmission],
//   ["AP Third PP", Order_APThirdPP, History_APThirdPP],
//   ["AP Ref No", Order_APRefNo, History_AppealRefNo],
//   ["AP Submitted", Order_APSubmitted, History_AppealAuthrequested],
//   ["AP Det Rec", Order_APDetRec, History_APDetRec],
//   ["AP Denial Reason", Order_APDenialReason, History_APReason],
//   ["AP Remarks", Order_APRemarks, History_APRemark]
// ];

// // CHECK MISMATCHES
// let mismatchFound = false;

// console.log("\n=====================");
// console.log("🔍 MISMATCH REPORT");
// console.log("=====================\n");

// for (const [label, orderVal, historyVal] of fieldsToCompare) {
//   const o = clean(orderVal);
//   const h = clean(historyVal);

//   if (o !== h) {
//     mismatchFound = true;
//     console.log(`❌ ${label} DOES NOT MATCH`);
//     console.log(`   ORDER : "${o}"`);
//     console.log(`   HIST  : "${h}"\n`);
//   }
// }

// if (!mismatchFound) {
//   console.log(" ALL VALUES MATCH!");
// }





});




