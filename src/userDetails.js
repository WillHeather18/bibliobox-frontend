export default class UserDetails {
    constructor(uuid, email, creationDate, lastLogin) {
      this.uuid = uuid;
      this.email = email;
      this.creationDate = creationDate;
      this.lastLogin = lastLogin;
      this.currentRecommendations = [];
    }

    static loginFromJSON(json) {
        return new UserDetails(
            json.uuid,
             json.email,
              json.accountCreationDate,
               json.lastLoginDate);
      }

    static recommendationsFromJSON(json) {
        return json[0].recommendations;
    }
}