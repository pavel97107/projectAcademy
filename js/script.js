document.addEventListener('DOMContentLoaded', function(){
  'use strict';
  
  let day = document.querySelector('.day'),
      newyear = document.querySelector('.newyear'),
      getTime = document.querySelector('.getTime');
  
      let newDate = new Date();
  
      let getHours = newDate.getHours();
      console.log('getHours: ', getHours);
  
      function hours(){
          if(getHours > 6 && getHours < 10){
              getTime.textContent = 'Доброе ' + ' утро';
          } else if (getHours > 10 && getHours < 16){
              getTime.textContent = 'Добрый ' + ' день';
          } else if (getHours > 16 && getHours <= 19) {
              getTime.textContent = 'Добрый ' + ' вечер';
          } else {
              getTime.textContent = 'Ложись спать братишка';
          }
      }
      hours();
      
      let dayX = newDate.getDay();
  
      if(dayX === 1) {
          dayX = 'Понедельник';
          day.textContent = day.textContent + " " + dayX;
      } else if( dayX === 2) {
          dayX = 'Вторник';
          day.textContent = day.textContent + " " + dayX;
      } else if( dayX === 3) {
          dayX = 'Среда';
          day.textContent = day.textContent + " " + dayX;
      } else if( dayX === 4) {       
          dayX = 'Четверг';
          day.textContent = day.textContent + " " + dayX;
      }else if( dayX === 5) {
          dayX = 'Пятница';
          day.textContent = day.textContent + " " + dayX;
      }else if( dayX === 6) {
          dayX = 'Суббота';
          day.textContent = day.textContent + " " + dayX;
      }else if( dayX === 7) {
          dayX = 'Воскресенье';
          day.textContent = day.textContent + " " + dayX;
          }
          
  
      const upTime = function (){
      let newDate = new Date();
      let data = newDate.toLocaleTimeString('en');
      document.querySelector('.timeTwo').innerHTML = data;
      };
  
      setInterval(upTime, 1000);
  
  
      function getDaysNewYear(){
          let daysYear = new Date('1 jan 2021').getTime();
          let todayDay = new Date().getTime();
          let sumDaysYear = (daysYear - todayDay) / 1000;
          let daysNewYear = Math.floor(sumDaysYear / 60 / 60 / 24);
          return daysNewYear;
      }
      
      newyear.textContent = newyear.textContent +  ` ${getDaysNewYear()} ` + `дней`;
      
  });