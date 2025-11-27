import { test, expect } from '@playwright/test';
import{faker} from '@faker-js/faker';
import { sendMail } from '../mail';
import { addResult, getResults } from '../resultsCollector'; 



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
      await page.locator('input[placeholder="Press Enter To Search"]').fill('97085');
      await page.waitForTimeout(1000);  
      //Press Enter
      await page.locator('input[placeholder="Press Enter To Search"]').press('Enter');
      await page.waitForTimeout(1000); 
      await page.locator(`a[title="Click to view order details"]:has-text("97085")`).click();
      await page.waitForTimeout(1000); 

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
        const AssignedTo = 'Foram Amin';
        const CreatedBy = 'Foram Amin';
       
        const Order_MRN = await page.locator('input[name="MRN"]').inputValue();
        const Order_FirstName = await page.locator('input[name="firstName"]').inputValue();
        const Order_Middle = await page.locator('input[id="middlepatientName"]').inputValue();
        const Order_LastName = await page.locator('input[id="lastpatientName"]').inputValue();
        console.log(Order_LastName);
        const Order_DOB = await page.locator('input[name="patientdob"]').inputValue();
        console.log(Order_DOB);
        const Order_Gender = await page.locator('span[id="select2-gender-container"]').innerText();
        console.log(Order_Gender);
        const Order_Address = await page.locator('input[id="address"]').inputValue();
        console.log(Order_Address);
        const Order_City = await page.locator('input[id="city"]').inputValue();
        console.log(Order_City);
        const Order_State = await page.locator('span[aria-labelledby="select2-state-container"]').innerText();
        console.log(Order_State);
        const Order_Zipcode = await page.locator('input[id="zip"]').inputValue();
        console.log(Order_Zipcode);
        const Order_ContactNo = await page.locator('input[id="contactnumber"]').inputValue();
        console.log(Order_ContactNo);
        const Order_DOS = await page.locator('input[id="DOSStart"]').inputValue();
        console.log(Order_DOS);
        const Order_PayerName = await page.locator('div[col-id="name"]').nth(1).innerText();
        console.log(Order_PayerName);
        const Order_MemberID = await page.locator('div[col-id="policyNumber"]').nth(1).innerText();
        console.log(Order_MemberID);
        const Order_Relationship = await page.locator('div[col-id="relationshipToPatient"]').nth(1).innerText();
        console.log(Order_Relationship);
        const Order_HolderName = await page.locator('div[col-id="holderName"]').nth(1).innerText();
        console.log(Order_HolderName);
        const Order_HolderDOB = await page.locator('div[col-id="holderDOB"]').nth(1).innerText();
        console.log(Order_HolderDOB);
        const Order_PhysicianDate = await page.locator('input[id="datereq"]').inputValue();
        console.log(Order_PhysicianDate);
        const Order_ReceivedDate = await page.locator('input[id="daterec"]').inputValue();
        console.log(Order_ReceivedDate);
        const Order_RequestDate = await page.locator('input[id="pastartdate"]').inputValue();
        console.log(Order_RequestDate);
        const Order_POS = await page.locator('span[id="select2-placeOfService-container"]').innerText();
        console.log(Order_POS);
        const Order_Location = await page.locator('span[id="select2-userLocationId-container"]').innerText();
        console.log(Order_Location);
        const Order_Categorization = await page.locator('span[id="select2-specialt-container"]').innerText();
        console.log(Order_Categorization);
        const Order_Stat = await page.locator('span[id="select2-stat-container"]').innerText();
        console.log(Order_Stat);
        const Order_ReqFN = await page.locator('span[id="select2-reqProvider-container"]').innerText();
        console.log(Order_ReqFN);
        const Order_ReqLN = await page.locator('input[id="reqLastname"]').inputValue();
        console.log(Order_ReqLN);
        // const Order_ReqTitle = await page.locator('input[id="reqTitle"]').inputValue();
        // console.log(Order_ReqTitle);
        const Order_ReqNPI = await page.locator('input[id="reqnpi"]').inputValue();
        console.log(Order_ReqNPI);
        const Order_ReqSpecialty = await page.locator('input[id="reqspeciality"]').inputValue();
        console.log(Order_ReqSpecialty);
        const Order_ReqContact = await page.locator('input[id="reqcontact"]').inputValue();
        console.log(Order_ReqContact);
        const Order_ReqAddress = await page.locator('input[id="reqAddress"]').inputValue();
        console.log(Order_ReqAddress);
        const Order_RenFN = await page.locator('span[id="select2-renProvider-container"]').innerText();
        console.log(Order_RenFN);
        const Order_RenLN = await page.locator('input[id="serLastname"]').inputValue();
        console.log(Order_RenLN);
        // const Order_RenTitle = await page.locator('input[id="serTitle"]').inputValue();
        // console.log(Order_RenTitle);
        const Order_RenNPI = await page.locator('input[id="sernpi"]').inputValue();
        console.log(Order_RenNPI);
        const Order_RenSpecialty = await page.locator('input[id="serspeciality"]').inputValue();
        console.log(Order_RenSpecialty);
        const Order_RenContact = await page.locator('input[id="sercontact"]').inputValue();
        console.log(Order_RenContact);
        const Order_RenAddress = await page.locator('input[id="serAddress"]').inputValue();
        console.log(Order_RenAddress);
        const Order_RFLegalname = await page.locator('input[id="facname"]').inputValue();
        console.log(Order_RFLegalname);
        // const Order_RFGroupTax = await page.locator('input[id="factaxid"]').inputValue();
        // console.log(Order_RFGroupTax);
        const Order_RFNPI = await page.locator('input[id="facgroupnpi"]').inputValue();
        console.log(Order_RFNPI);
        // const Order_RFFax = await page.locator('input[id="facfaxno"]').inputValue();
        // console.log(Order_RFFax);
        // const Order_RFContact = await page.locator('input[id="faccontact"]').inputValue();
        // console.log(Order_RFContact);
        const Order_RFAddress = await page.locator('input[id="facaddress"]').inputValue();
        console.log(Order_RFAddress);

        const Order_MedDrugName = await page.locator('div[col-id="drugName"]').nth(1).innerText();
        console.log(Order_MedDrugName);
        const Order_Meddosage = await page.locator('div[col-id="dose"]').nth(1).innerText();
        console.log(Order_Meddosage);
        const Order_MedCPT = await page.locator('div[col-id="cpthcpcsCode"]').nth(1).innerText();
        console.log(Order_MedCPT);
        const Order_MedDXCode = await page.locator('div[col-id="primaryDXCode"]').nth(1).innerText();
        console.log(Order_MedDXCode);
        const Order_MedDoseUnit = await page.locator('div[col-id="strengthToBeGiven"]').nth(1).innerText();
        console.log(Order_MedDoseUnit);
        const Order_MedFrequency = await page.locator('div[col-id="frequency"]').nth(1).innerText();
        console.log(Order_MedFrequency);
        const Order_MedQuantity = await page.locator('div[col-id="quantity"]').nth(1).innerText();
        console.log(Order_MedQuantity);
        const Order_MedCycle = await page.locator('div[col-id="cycle"]').nth(1).innerText();
        console.log(Order_MedCycle);
        const Order_MedDOS = await page.locator('div[col-id="dateOfServiceStart"]').nth(1).innerText();
        console.log(Order_MedDOS);

        const Order_MedDrug1 = await page.locator('div[col-id="drugName"]').nth(2).innerText();
        console.log(Order_MedDrug1);
        const Order_Meddose1 = await page.locator('div[col-id="dose"]').nth(2).innerText();
        console.log(Order_Meddose1);
        const Order_MedCPT1 = await page.locator('div[col-id="cpthcpcsCode"]').nth(2).innerText();
        console.log(Order_MedCPT1);
        const Order_MedDXCode1 = await page.locator('div[col-id="primaryDXCode"]').nth(2).innerText();
        console.log(Order_MedDXCode1);
        const Order_MedDoseUnit1 = await page.locator('div[col-id="strengthToBeGiven"]').nth(2).innerText();
        console.log(Order_MedDoseUnit1);
        const Order_MedFrequency1 = await page.locator('div[col-id="frequency"]').nth(2).innerText();
        console.log(Order_MedFrequency1);
        const Order_MedQuantity1 = await page.locator('div[col-id="quantity"]').nth(2).innerText();
        console.log(Order_MedQuantity1);
        const Order_MedCycle1 = await page.locator('div[col-id="cycle"]').nth(2).innerText();
        console.log(Order_MedCycle1);
        const Order_MedDOS1 = await page.locator('div[col-id="dateOfServiceStart"]').nth(2).innerText();
        console.log(Order_MedDOS1);

        const Order_ProceduresDrugName = await page.locator('div[col-id="procedureName"]').nth(1).innerText();
        console.log(Order_ProceduresDrugName);
        const Order_ProceduresCPT = await page.locator('div[col-id="cpthcpcsCode"]').nth(4).innerText();
        console.log(Order_ProceduresCPT);
        const Order_ProceduresDXCode = await page.locator('div[col-id="primaryDXCode"]').nth(4).innerText();
        console.log(Order_ProceduresDXCode);
        // const Order_ProceduresQuantity = await page.locator('div[col-id="quantity"]').nth(4).innerText();
        // console.log(Order_ProceduresQuantity);
        const Order_ProceduresDOS = await page.locator('div[col-id="dateOfServiceStart"]').nth(1).innerText();
        console.log(Order_ProceduresDOS);

        const Order_BV = await page.locator('span[id="select2-PAprocess-container"]').innerText();
        console.log(Order_BV);
        const Order_TypeOfReview = await page.locator('input[id="PARequired"]').inputValue();
        console.log(Order_TypeOfReview);
        const Order_PA = await page.locator('#select2-submissionmethod-container').textContent();
        console.log(Order_PA);
        const Order_PAFAX = await page.locator('input[id="faxnumber"]').inputValue();
        console.log(Order_PAFAX);
        const Order_PARef = await page.locator('input[id="Refno"]').inputValue();
        console.log(Order_PARef);
        const Order_PAAuthRequested = await page.locator('input[id="AuthReqOn"]').inputValue();
        console.log(Order_PAAuthRequested);
        const Order_DeterminationRec = await page.locator('input[id="dendetrecondate"]').inputValue();
        console.log(Order_DeterminationRec);
        const Order_DenialReason = await page.locator('span[id="select2-denialreasondrp-container"]').innerText();
        console.log(Order_DenialReason);
        const Order_APSubmissionMethod = await page.locator('span[id="select2-APsubmissionmethod-container"]').innerText();
        console.log(Order_APSubmissionMethod);
        const Order_APThirdPP = await page.locator('span[id="select2-APthirdpayerportal-container"]').innerText();
        console.log(Order_APThirdPP);
        const Order_APRefNo = await page.locator('input[id="APRefno"]').inputValue();
        console.log(Order_APRefNo);
        const Order_APSubmitted = await page.locator('input[id="APAuthReqOn"]').inputValue();
        console.log(Order_APSubmitted);
        const Order_APDetRec = await page.locator('input[id="APdendetrecondate"]').inputValue();
        console.log(Order_APDetRec);
        const Order_APDenialReason = await page.locator('span[id="select2-APdenialreasondrp-container"]').innerText();
        console.log(Order_APDenialReason);
        const Order_APRemarks = await page.locator('textarea#APremarks').textContent();
        console.log(Order_APRemarks);




      await page.locator('a[id="historyModal"]').click();
      await page.waitForTimeout(1500);
      
   // await page.waitForSelector('span.ag-cell-value', { timeout: 5000 }); 
      await page.locator('span[class="right-span"]').click();
      await page.waitForTimeout(1500);


    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Patient MRN', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_MRN = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_MRN);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Patient First Name', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_FirstName = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_FirstName);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Patient Middle Initial', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_Middle = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_Middle);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Patient Last Name', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_LastName = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_LastName);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('DateOfBirth', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_DOB = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_DOB);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Patient Gender', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_Gender = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_Gender);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Patient Address1', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_Address = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_Address);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Patient City', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_City = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_City);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Patient State', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_State = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_State);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Patient Zip', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_Zip = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_Zip);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Patient Mobile Phone', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_ContactNo = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_ContactNo);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Date of service', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_DOS = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_DOS);
    await page.locator('[data-filtertype="Insurance"]').click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Payer Name', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_PayerName = await page.locator('div[col-id="newValue"]').nth(4).innerText();
    console.log(History_PayerName);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Policy Number', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_MemberID = await page.locator('div[col-id="newValue"]').nth(4).innerText();
    console.log(History_MemberID);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Patient Relationship to Holder', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_Relation = await page.locator('div[col-id="newValue"]').nth(4).innerText();
    console.log(History_Relation);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Holder Name', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_HolderName = await page.locator('div[col-id="newValue"]').nth(4).innerText();
    console.log(History_HolderName);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Holder Date Of Birth', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_HolderDOB = await page.locator('div[col-id="newValue"]').nth(4).innerText();
    console.log(History_HolderDOB);



    await page.locator('button[data-filtertype="Order"]').click(); //Orders
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Physician Order date', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_PhysicianOrderdate = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_PhysicianOrderdate);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Order received date', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_Orderreceiveddate = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_Orderreceiveddate);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Prior Auth Start Date', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_RequestedDate = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_RequestedDate);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Place Of Service', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_POS = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_POS);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Location', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_Location = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_Location);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Categorization', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_Categorization = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_Categorization);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Requesting Provider First Name', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_ReqFN = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_ReqFN);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Requesting Provider LastName', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_ReqLN = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_ReqLN);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Requesting Provider NPI', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_ReqNPI = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_ReqNPI);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Requesting Provider Specialty', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_ReqSpecialty = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_ReqSpecialty);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Requesting Provider Phone', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_ReqContactNo = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_ReqContactNo);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Requesting Provider Address', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_ReqAddress = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_ReqAddress);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Rendering Provider FirstName', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_RenFN = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_RenFN);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Rendering Provider LastName', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_RenLN = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_RenLN);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Rendering Provider NPI', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_RenNPI = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_RenNPI);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Rendering Provider Specialty', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_RenSpecialty = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_RenSpecialty);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Rendering Provider Phone', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_RenContact = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_RenContact);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Rendering Provider Address', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_RenAddress = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_RenAddress);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Rendering Facility LegalName', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_RFLegalname = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log('History_RFLegalname:',History_RFLegalname);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Rendering Facility GroupNPI', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_RFNPI = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log('History_RFNPI: ',History_RFNPI);
    // await page.locator('a[class="btn submit"]').nth(0).click();
    // await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Rendering Facility GroupTax', { delay: 30 });
    // await page.waitForTimeout(1000); 
    // const History_RenTax = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    // console.log(History_RenTax);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Rendering Facility Address', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_RFAddress = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_RFAddress);

    // await page.locator('button[data-filtertype="Medication"]').click(); //Medications
    // await page.locator('span[title="Select"]').click();
    // await page.locator('div[class="select2-result-repository__title"]').nth(0).click(); //RITUXAN (J9312)
    // await page.locator('a[class="btn submit"]').nth(0).click();
    // await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Drug Name', { delay: 30 });
    // await page.waitForTimeout(1000); 
    // const History_MedDrugName1 = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    // console.log(History_MedDrugName1);
    // await page.locator('a[class="btn submit"]').nth(0).click();
    // await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Dose', { delay: 30 });
    // await page.waitForTimeout(1000); 
    // const History_MedDose1 = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    // console.log('History_MedDose1: ',History_MedDose1);
    // await page.locator('a[class="btn submit"]').nth(0).click();
    // await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('CPT/HCPCS', { delay: 30 });
    // await page.waitForTimeout(1000); 
    // const History_MedCPT1 = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    // console.log('History_MedCPT1:',History_MedCPT1);
    // await page.locator('a[class="btn submit"]').nth(0).click();
    // await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Primary DX Code', { delay: 30 });
    // await page.waitForTimeout(1000); 
    // const History_MedDXCode1 = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    // console.log(History_MedDXCode1);
    // await page.locator('a[class="btn submit"]').nth(0).click();
    // await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Dose To Be Given', { delay: 30 });
    // await page.waitForTimeout(1000); 
    // const History_MedDoseUnit1 = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    // console.log(History_MedDoseUnit1);
    // await page.locator('a[class="btn submit"]').nth(0).click();
    // await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Frequency', { delay: 30 });
    // await page.waitForTimeout(1000); 
    // const History_MedFrequency1 = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    // console.log(History_MedFrequency1);
    // await page.locator('a[class="btn submit"]').nth(0).click();
    // await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Quantity', { delay: 30 });
    // await page.waitForTimeout(1000); 
    // const History_MedQuantity1 = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    // console.log(History_MedQuantity1);
    // await page.locator('a[class="btn submit"]').nth(0).click();
    // await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Cycle', { delay: 30 });
    // await page.waitForTimeout(1000); 
    // const History_MedCycle1 = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    // console.log(History_MedCycle1);
    // await page.locator('a[class="btn submit"]').nth(0).click();
    // await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Date of service', { delay: 30 });
    // await page.waitForTimeout(1000); 
    // const History_MedDOS1 = await page.locator('div[col-id="newValue"]').nth(3).innerText();
    // console.log(History_MedDOS1);
    // await page.locator('#medicationdrp > span').click();
    // await page.locator('div[class="select2-result-repository__title"]').nth(1).click(); //Cyclophosphamide (J9070)
    // await page.locator('a[class="btn submit"]').nth(0).click();
    // await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Drug Name', { delay: 30 });
    // await page.waitForTimeout(1000); 
    // const History_MedDrugName = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    // console.log('History_MedDrugName:',History_MedDrugName);
    // await page.locator('a[class="btn submit"]').nth(0).click();
    // await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Dose', { delay: 30 });
    // await page.waitForTimeout(1000); 
    // const History_MedDose = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    // console.log('History_MedDose: ',History_MedDose);
    // await page.locator('a[class="btn submit"]').nth(0).click();
    // await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('CPT/HCPCS', { delay: 30 });
    // await page.waitForTimeout(1000); 
    // const History_MedCPT = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    // console.log('History_MedCPT:',History_MedCPT);
    // await page.locator('a[class="btn submit"]').nth(0).click();
    // await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Primary DX Code', { delay: 30 });
    // await page.waitForTimeout(1000); 
    // const History_MedDXCode = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    // console.log(History_MedDXCode);
    // await page.locator('a[class="btn submit"]').nth(0).click();
    // await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Dose To Be Given', { delay: 30 });
    // await page.waitForTimeout(1000); 
    // const History_MedDoseUnit = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    // console.log(History_MedDoseUnit);
    // await page.locator('a[class="btn submit"]').nth(0).click();
    // await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Frequency', { delay: 30 });
    // await page.waitForTimeout(1000); 
    // const History_MedFrequency = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    // console.log(History_MedFrequency);
    // await page.locator('a[class="btn submit"]').nth(0).click();
    // await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Quantity', { delay: 30 });
    // await page.waitForTimeout(1000); 
    // const History_MedQuantity = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    // console.log(History_MedQuantity);
    // await page.locator('a[class="btn submit"]').nth(0).click();
    // await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Cycle', { delay: 30 });
    // await page.waitForTimeout(1000); 
    // const History_MedCycle = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    // console.log(History_MedCycle);
    // await page.locator('a[class="btn submit"]').nth(0).click();
    // await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Date of service', { delay: 30 });
    // await page.waitForTimeout(1000); 
    // const History_MedDOS = await page.locator('div[col-id="newValue"]').nth(3).innerText();
    // console.log(History_MedDOS);

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

    await page.locator('button[data-filtertype="Procedure"]').click(); //Procedures 
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Procedure Name', { delay: 50 });
    await page.waitForTimeout(1000); 
    const History_ProcedureName = await page.locator('div[col-id="newValue"]').nth(3).innerText();
    console.log(History_ProcedureName);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('CPT/HCPCS', { delay: 50 });
    await page.waitForTimeout(1000); 
    const History_ProcedureCPT = await page.locator('div[col-id="newValue"]').nth(4).innerText();
    console.log(History_ProcedureCPT);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Primary DX Code', { delay: 50 });
    await page.waitForTimeout(1000); 
    const History_ProcedureDXCode = await page.locator('div[col-id="newValue"]').nth(4).innerText();
    console.log(History_ProcedureDXCode);
    // await page.locator('a[class="btn submit"]').nth(0).click();
    // await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Quantity', { delay: 70 });
    // await page.waitForTimeout(1000); 
    // const History_ProcedureQuantity = await page.locator('div[col-id="newValue"]').nth(3).innerText();
    // console.log(History_ProcedureQuantity);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Date of service', { delay: 50 });
    await page.waitForTimeout(1000); 
    const History_ProcedureDOS = await page.locator('div[col-id="newValue"]').nth(3).innerText();
    console.log(History_ProcedureDOS);
    await page.locator('button[data-filtertype="Order"]').click(); //Orders
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Benefits Verification Verification Method', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_BV = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_BV);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Benefits Verification Review Type', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_TypeOfReview = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_TypeOfReview);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('PA Submission Fax Number', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_PAFAX = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_PAFAX);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('PA Submission Reference No', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_PARef = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_PARef);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Auth requested on', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_PARequestDate = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_PARequestDate);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Determination Denial Received On Date', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_DeterminationRec = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_DeterminationRec);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Determination Denial Denial Reason', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_DenialReason = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    console.log(History_DenialReason);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Appeal Submission Method Type', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_AppealSubmission = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_AppealSubmission);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Appeal Submission Third Party Portal', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_APThirdPP = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    console.log(History_APThirdPP);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Appeal Submission Reference No', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_AppealRefNo = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_AppealRefNo);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Appeal Auth requested on', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_AppealAuthrequested = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_AppealAuthrequested);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Appeal Determination Denial Received On Date', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_APDetRec = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_APDetRec);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Appeal Determination Denial Reason', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_APReason = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_APReason);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Appeal Determination Denial Remark', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_APRemark = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_APRemark);

    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Workflow Status', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_Workflow1 = await page.locator('div[col-id="newValue"]').nth(7).innerText();
    console.log(History_Workflow1);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Workflow Status', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_Workflow2 = await page.locator('div[col-id="newValue"]').nth(6).innerText();
    console.log(History_Workflow2);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Workflow Status', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_Workflow3 = await page.locator('div[col-id="newValue"]').nth(5).innerText();
    console.log(History_Workflow3);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Workflow Status', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_Workflow4 = await page.locator('div[col-id="newValue"]').nth(4).innerText();
    console.log(History_Workflow4);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Workflow Status', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_Workflow5 = await page.locator('div[col-id="newValue"]').nth(3).innerText();
    console.log(History_Workflow5);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Workflow Status', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_Workflow6 = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    console.log(History_Workflow6);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Workflow Status', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_Workflow7 = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_Workflow7);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Outcome', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_Outcome1 = await page.locator('div[col-id="newValue"]').nth(3).innerText();
    console.log(History_Outcome1);
    await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Outcome', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_Outcome2 = await page.locator('div[col-id="newValue"]').nth(2).innerText();
    console.log(History_Outcome2);
      await page.locator('a[class="btn submit"]').nth(0).click();
    await page.locator('input[placeholder="Quick Search"]').nth(0).pressSequentially('Outcome', { delay: 30 });
    await page.waitForTimeout(1000); 
    const History_Outcome3 = await page.locator('div[col-id="newValue"]').nth(1).innerText();
    console.log(History_Outcome3);














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


//   if (
//   clean(Order_MRN) === clean(History_MRN) &&
//   clean(Order_FirstName) === clean(History_FirstName) &&
//   clean(Order_Middle) === clean(History_Middle) &&
//   clean(Order_LastName) === clean(History_LastName) &&
//   clean(Order_DOB) === clean(History_DOB) &&
//   clean(Order_Gender) === clean(History_Gender) &&
//   clean(Order_Address) === clean(History_Address) &&
//   clean(Order_City) === clean(History_City) &&
//   clean(Order_State) === clean(History_State) &&
//   clean(Order_Zipcode) === clean(History_Zip) &&
//   clean(Order_ContactNo) === clean(History_ContactNo) &&
//   clean(Order_DOS) === clean(History_DOS) &&
//   clean(Order_PayerName) === clean(History_PayerName) &&
//   clean(Order_MemberID) === clean(History_MemberID) &&
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




//  ) {
//   console.log("✅ Patient Details Matched Successfully!");
// } else {
//   console.log("❌ Patient Details do not match!");
// }

    


// CLEAN FUNCTION (keep as is)
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

// ARRAY OF FIELDS TO COMPARE
const fieldsToCompare: [string, any, any][] = [
  ["MRN", Order_MRN, History_MRN],
  ["First Name", Order_FirstName, History_FirstName],
  ["Middle Name", Order_Middle, History_Middle],
  ["Last Name", Order_LastName, History_LastName],
  ["DOB", Order_DOB, History_DOB],
  ["Gender", Order_Gender, History_Gender],
  ["Address", Order_Address, History_Address],
  ["City", Order_City, History_City],
  ["State", Order_State, History_State],
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
  ["AP Remarks", Order_APRemarks, History_APRemark],
  // Workflows
  ["Workflow1", Workflow1, History_Workflow1],
  ["Workflow2", Workflow2, History_Workflow2],
  ["Workflow3", Workflow3, History_Workflow3],
  ["Workflow4", Workflow4, History_Workflow4],
  ["Workflow5", Workflow5, History_Workflow5],
  ["Workflow6", Workflow6, History_Workflow6],
  ["Workflow7", Workflow7, History_Workflow7],

  // Outcomes
  ["Outcome1", Outcome1, History_Outcome1],
  ["Outcome2", Outcome2, History_Outcome2],
  ["Outcome3", Outcome3, History_Outcome3]
];

// CHECK MISMATCHES
let mismatchFound = false;

console.log("\n=====================");
console.log("🔍 MISMATCH REPORT");
console.log("=====================\n");

for (const [label, orderVal, historyVal] of fieldsToCompare) {
  const o = clean(orderVal);
  const h = clean(historyVal);

  if (o !== h) {
    mismatchFound = true;
    console.log(`❌ ${label} DOES NOT MATCH`);
    console.log(`   ORDER : "${o}"`);
    console.log(`   HIST  : "${h}"\n`);
  }
}

if (!mismatchFound) {
  console.log(" ALL VALUES MATCH!");
}






    // const Grid_Categorization = await page.locator('div[col-id="specialty"]').nth(1).innerText();
    // const Grid_Status = await page.locator('div[col-id="status"]').nth(1).innerText();
    // const Grid_Outcome = await page.locator('div[col-id="outcome"]').nth(1).innerText();

    


});