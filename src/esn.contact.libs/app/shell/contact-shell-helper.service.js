(function(angular) {
  'use strict';

  angular.module('esn.contact.libs')
    .factory('ContactShellHelper', ContactShellHelper);

  function ContactShellHelper() {

    return {
      getMetadata: getMetadata
    };

    function getMetadata(href) {
      if (!href) {
        return;
      }

      var split = href.split('/');
      var cardId = split.pop().split('.').shift();
      var bookName = split.pop();
      var bookId = split.pop();

      return {
        cardId: cardId,
        bookId: bookId,
        bookName: bookName
      };
    }
  }
})(angular);
