<<<<<<< 3ddb5c9639f826226e2e248d4cb9ebe27866a5ec
=======

  'use strict';

  angular.module('linagora.esn.contact')
    .factory('SearchAddressBookPaginationProvider', SearchAddressBookPaginationProvider);

  function SearchAddressBookPaginationProvider($log, ContactAPIClient) {

    function _SearchAddressBookPaginationProvider(options) {
      this.options = options;
      this.user = this.options.user;
      this.bookId = this.user._id;
      this.totalHits = 0;
      this.lastPage = false;
      this.nextPage = 0;
    }

    _SearchAddressBookPaginationProvider.prototype.loadNextItems = function(options) {
      var self = this;
      var page = this.nextPage || 1;

      $log.debug('Search contacts page %s for bookId %s', page, this.bookId);

      var query = {
        data: options.searchInput,
        userId: this.options.user._id,
        page: page
      };

      return ContactAPIClient
        .addressbookHome(this.bookId)
        .search(query)
        .then(function(result) {
          self.currentPage = result.current_page;
          self.totalHits = self.totalHits + result.data.length;
          self.nextPage = result.next_page;
          if (self.totalHits === result.total_hits) {
            self.lastPage = true;
          }
          result.lastPage = self.lastPage;

          return result;
        });
    };
>>>>>>> #50 delete files from linagora.esn.contacts and their require

'use strict';

angular.module('linagora.esn.contact')
  .factory('SearchAddressBookPaginationProvider', SearchAddressBookPaginationProvider);

function SearchAddressBookPaginationProvider($log, ContactAPIClient) {

  function _SearchAddressBookPaginationProvider(options) {
    this.options = options;
    this.user = this.options.user;
    this.bookId = this.user._id;
    this.totalHits = 0;
    this.lastPage = false;
    this.nextPage = 0;
  }
<<<<<<< 3ddb5c9639f826226e2e248d4cb9ebe27866a5ec

  _SearchAddressBookPaginationProvider.prototype.loadNextItems = function(options) {
    var self = this;
    var page = this.nextPage || 1;

    $log.debug('Search contacts page %s for bookId %s', page, this.bookId);

    var query = {
      data: options.searchInput,
      userId: this.options.user._id,
      page: page
    };

    return ContactAPIClient
      .addressbookHome(this.bookId)
      .search(query)
      .then(function(result) {
        self.currentPage = result.current_page;
        self.totalHits = self.totalHits + result.data.length;
        self.nextPage = result.next_page;
        if (self.totalHits === result.total_hits) {
          self.lastPage = true;
        }
        result.lastPage = self.lastPage;

        return result;
      });
  };

  return _SearchAddressBookPaginationProvider;
}
=======
  
>>>>>>> #50 delete files from linagora.esn.contacts and their require
