1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
   answer:
   i: getElementById দিয়ে আমরা HTML ডকুমেন্ট থেকে যেকোনো id এর নাম দিয়ে JavaScript এর মাধ্যমে তা access করতে পারি।যেহেতু id ইউনিক হতে হয়, তাই getElementById দিয়ে শুধু একটি element access করা যায়।
   ii: getElementsByClassName দিয়ে আমরা HTML ডকুমেন্ট থেকে একই class থাকা একাধিক element access করতে পারি।
   iii: querySelector দিয়ে আমরা id, class, tag যেকোনো element access করতে পারি।
   iv: querySelectorAll দিয়েও আমরা id, class, tag যেকোনো element access করতে পারি।

2. How do you create and insert a new element into the DOM?
   answer:
   প্রথমে HTML-এ একটি ফাঁকা container বানাতে হবে, যার মধ্যে নতুন তৈরি করা elementটি add করা হবে। HTML-এ যে ফাঁকা elementটি নিয়েছি, তাকে একটি variable-এ access করব।document.createElement() এর মধ্যে আমরা ইচ্ছা মতো tag নাম দিতে পারি এবং এটি একটি variable-এ assign করব।বানানো variable-এ variable.innerHTML ব্যবহার করে আমরা ইচ্ছা মতো content দিতে পারি।parent variable-এ নতুন variable-টি appendChild(newVariable) করে add করব।এভাবে নতুন element তৈরি ও DOM-এ insert করা হয়

3. What is Event Bubbling? And how does it work?
   answer:
   Event Bubbling: Event bubbling-এর মাধ্যমে আমরা কোনো element-এর parent, তার parent, তার parent এভাবে উপরের দিকে (grandparent → parent → document) event প্রেরণ করতে পারি।

4. What is Event Delegation in JavaScript? Why is it useful?
   answer:
   Event Delegation: Event Delegation দিয়ে আমরা একাধিক child element-এ আলাদা আলাদা করে eventListener add না করে, তাদের parent element-এ একটি মাত্র eventListener দিয়ে সব child element handle করতে পারি।Event Delegation ব্যবহার করলে parent element-এ একটি eventListener দিয়ে সব child element handle করা সম্ভব। এর ভিতরে আমরা event.target.classList.contains() বা event.target.closest() দিয়ে নির্দিষ্ট child element-এ event ঘটাতে পারি।

5. What is the difference between preventDefault() and stopPropagation() methods?
   answer:
   preventDefault() method ব্যবহার করে আমরা element-এর default behavior আটকাতে পারি।
   stopPropagation() method ব্যবহার করে আমরা element-এর Event bubbling আটকাতে পারি।
