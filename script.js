let interviewList = [];
let rejectedList = [];
let currentStatus = "all-filter-btn";

// Step-1 get Count Add
let total = document.getElementById("totalCount");
let interviewCount = document.getElementById("interviewCount");
let rejectedCount = document.getElementById("rejectedCount");
let sideCount = document.getElementById("sidCount");
let totalJobs = document.getElementById("totalJobs");
let sidOf = document.getElementById("sidOf");

// Step-2 Get Toggle button
const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");

const allCardSection = document.getElementById("allCards");
const mainContainer = document.querySelector("main");
const filteredSection = document.getElementById("filtered-section");
const deleteBtn = document.getElementById("btn-delete");

// Step-1 Function Count – now shows correct side count based on active tab
function calculateCount() {
  const totalJobsCount = allCardSection.children.length;
  total.innerText = totalJobsCount;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;

  // Set side count according to the current filter
  if (currentStatus === "all-filter-btn") {
    sideCount.innerText = totalJobsCount;
    totalJobs.classList.add("hidden");
    sidOf.classList.add("hidden");
  } else if (currentStatus === "interview-filter-btn") {
    sideCount.innerText = interviewList.length;
    totalJobs.classList.remove("hidden");
    sidOf.classList.remove("hidden");
  } else if (currentStatus === "rejected-filter-btn") {
    sideCount.innerText = rejectedList.length;
    totalJobs.classList.remove("hidden");
    sidOf.classList.remove("hidden");
  }

  totalJobs.innerText = totalJobsCount;
}

calculateCount();

// Step-2 Toggle Button
function toggleStyle(id) {
  allFilterBtn.classList.remove("bg-[#3B82F6]", "text-white");
  interviewFilterBtn.classList.remove("bg-[#FFFFFF]", "text-white");
  rejectedFilterBtn.classList.remove("bg-[#FFFFFF]", "text-white");

  allFilterBtn.classList.add("bg-[#FFFFFF]", "text-black");
  interviewFilterBtn.classList.add("bg-[#FFFFFF]", "text-black");
  rejectedFilterBtn.classList.add("bg-[#FFFFFF]", "text-black");

  const selected = document.getElementById(id);
  currentStatus = id;

  selected.classList.remove("bg-[#FFFFFF]", "text-black");
  selected.classList.add("bg-[#3B82F6]", "text-white");

  if (id === "interview-filter-btn") {
    allCardSection.classList.add("hidden");
    filteredSection.classList.remove("hidden");
    renderInterview();
  } else if (id === "all-filter-btn") {
    allCardSection.classList.remove("hidden");
    filteredSection.classList.add("hidden");
  } else if (id === "rejected-filter-btn") {
    allCardSection.classList.add("hidden");
    filteredSection.classList.remove("hidden");
    renderRejected();
  }

  calculateCount();
}

const allCards = document.getElementById("allCards");
allCards.addEventListener("click", function (e) {
  if (e.target.closest(".btn-delete")) {
    const card = e.target.closest(".card");
    if (card) {
      card.remove();
      calculateCount();
    }
  }
});

mainContainer.addEventListener("click", function (event) {
  // interview-button event Listener
  if (event.target.classList.contains("interview-btn")) {
    const parentNode = event.target.parentNode.parentNode;
    const companyName = parentNode.querySelector(".companyName").innerText;
    const jobTitle = parentNode.querySelector(".jobTitle").innerText;
    const companySalary = parentNode.querySelector(".companySalary").innerText;
    const status = parentNode.querySelector(".status").innerText;
    const notes = parentNode.querySelector(".notes").innerText;
    const interviewBtn = parentNode.querySelector(".interview-btn").innerText;
    const rejectedBtn = parentNode.querySelector(".rejected-btn").innerText;

    parentNode.querySelector(".status").innerHTML = `
      <p class="interview-btn uppercase cursor-pointer font-bold text-[15px] border border-[#10B981] px-4 py-2 text-[#10B981] shadow rounded-md"> Interview </p>
    `;

    const cardInfo = {
      companyName,
      jobTitle,
      companySalary,
      status: "Interview",
      notes,
      interviewBtn,
      rejectedBtn,
    };

    const companyExists = interviewList.find(
      (item) => item.companyName === cardInfo.companyName,
    );

    if (!companyExists) {
      interviewList.push(cardInfo);
    }

    rejectedList = rejectedList.filter(
      (item) => item.companyName !== cardInfo.companyName,
    );

    if (currentStatus === "rejected-filter-btn") {
      renderRejected();
    }

    calculateCount();
  }

  // rejected-button event Listener
  if (event.target.classList.contains("rejected-btn")) {
    const parentNode = event.target.parentNode.parentNode;
    const companyName = parentNode.querySelector(".companyName").innerText;
    const jobTitle = parentNode.querySelector(".jobTitle").innerText;
    const companySalary = parentNode.querySelector(".companySalary").innerText;
    const status = parentNode.querySelector(".status").innerText;
    const notes = parentNode.querySelector(".notes").innerText;
    const interviewBtn = parentNode.querySelector(".interview-btn").innerText;
    const rejectedBtn = parentNode.querySelector(".rejected-btn").innerText;

    parentNode.querySelector(".status").innerHTML = `
      <button class="rejected-btn text-[15px] uppercase  font-bold border border-[#EF4444] px-4 py-2 text-[#EF4444] shadow rounded-md">Rejected</button>`;

    const cardInfo = {
      companyName,
      jobTitle,
      companySalary,
      status: "Rejected",
      notes,
      interviewBtn,
      rejectedBtn,
    };

    const companyExists = rejectedList.find(
      (item) => item.companyName === cardInfo.companyName,
    );

    if (!companyExists) {
      rejectedList.push(cardInfo);
    }

    interviewList = interviewList.filter(
      (item) => item.companyName !== cardInfo.companyName,
    );

    if (currentStatus === "interview-filter-btn") {
      renderInterview();
    }

    calculateCount();
  }
});

// renderInterview create function
function renderInterview() {
  filteredSection.innerHTML = "";

  if (interviewList.length === 0) {
    filteredSection.innerHTML = `
  <div class="container mx-auto mt-10 bg-[#fcfcfc] shadow-xl rounded-md h-[400px] p-3 md:p-0">
    <div class="flex flex-col justify-center items-center h-full">
     <img class="mb-5" src="./jobs.png" alt="jobs icon">
     <div>
      <h2 class="text-2xl font-bold text-center mb-2 text-[#002C5C]">No jobs available</h2>
      <p class="text-xl text-center">Check back soon for new job opportunities</p>
     </div>
    </div>
  </div>
    `;
  }

  for (let interview of interviewList) {
    let div = document.createElement("div");
    div.innerHTML = `
        <div class="flex justify-between p-5 shadow-xl rounded-md mb-10">
          <div class="left">
            <div>
              <h2 class="companyName text-xl font-bold text-[#002C5C] mb-1">
                ${interview.companyName}
              </h2>
              <p class="jobTitle text-[#64748B] mb-5">${interview.jobTitle} </p>
            </div>
            <p class="companySalary text-[#64748B]">
              ${interview.companySalary}
            </p>
            <button  class="status interview-btn uppercase cursor-pointer font-bold text-[15px] border border-[#10B981] px-4 py-2 text-[#10B981] shadow rounded-md">
              ${interview.status}
            </button>
            <p  class="notes mt-2 text-[#323B49]">
              ${interview.notes}
            </p>
            <div class="mt-5 flex gap-5">
              <p
                class="interview-btn uppercase cursor-pointer font-bold text-[15px] border border-[#10B981] px-4 py-2 text-[#10B981] shadow rounded-md"
              >
                ${interview.interviewBtn}
              </p>
              <button
                class="rejected-btn text-[15px] uppercase  font-bold border border-[#EF4444] px-4 py-2 text-[#EF4444] shadow rounded-md"
              >
                ${interview.rejectedBtn}
              </button>
            </div>
          </div>
          <div class="right text-[#64748B] mt-4 mr-2 text-xl">
            <button class="btn-delete"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        </div>
        `;
    filteredSection.appendChild(div);
  }
}

// renderRejected create function
function renderRejected() {
  filteredSection.innerHTML = "";

  if (rejectedList.length === 0) {
    filteredSection.innerHTML = `
    <div class="container mx-auto mt-10 bg-[#fcfcfc] shadow-xl rounded-md h-[400px] p-3 md:p-0">
      <div class="flex flex-col justify-center items-center h-full">
        <img class="mb-5" src="./jobs.png" alt="jobs icon">
        <div>
         <h2 class="text-2xl font-bold text-center mb-2 text-[#002C5C]">No jobs Rejected</h2>
         <p class="text-xl text-center">Check back soon for new job opportunities</p>
       </div>
     </div>
   </div>
    `;
  }

  for (let rejected of rejectedList) {
    let div = document.createElement("div");
    div.innerHTML = `
        <div class="flex justify-between p-5 shadow-xl rounded-md mb-10">
          <div class="left">
            <div>
              <h2 class="companyName text-xl font-bold text-[#002C5C] mb-1">
                ${rejected.companyName}
              </h2>
              <p class="jobTitle text-[#64748B] mb-5">${rejected.jobTitle} </p>
            </div>
            <p class="companySalary text-[#64748B]">
              ${rejected.companySalary}
            </p>
            <button  class="status rejected-btn text-[15px] uppercase  font-bold border border-[#EF4444] px-4 py-2 text-[#EF4444] shadow rounded-md">
              ${rejected.status}
            </button>
            <p  class="notes mt-2 text-[#323B49]">
              ${rejected.notes}
            </p>
            <div class="mt-5 flex gap-5">
              <p
                class="interview-btn uppercase cursor-pointer font-bold text-[15px] border border-[#10B981] px-4 py-2 text-[#10B981] shadow rounded-md"
              >
                 ${rejected.interviewBtn}
              </p>
              <button
                class="rejected-btn text-[15px] uppercase  font-bold border border-[#EF4444] px-4 py-2 text-[#EF4444] shadow rounded-md"
              >
                ${rejected.rejectedBtn}
              </button>
            </div>
          </div>
          <div class="right text-[#64748B] mt-4 mr-2 text-xl">
            <button class="btn-delete"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        </div>
        `;
    filteredSection.appendChild(div);
  }
}
