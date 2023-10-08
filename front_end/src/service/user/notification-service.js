// app.service("NotificationService", function ($http) {
//   var notifications = {};

//   this.getNotification = function () {
//     return notifications;
//   };

//   this.fetchNotifications = function () {
//     $http.get(notificationAPI).then(
//       function (response) {
//         if (response.status === 200) {
//           notifications = response.data.data;
//         }
//       },
//       function (errors) {
//         console.log(errors);
//       }
//     );
//   };
// });
