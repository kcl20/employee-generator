const Employee = require('../index');

describe("Manager", () => {
    it("should save the manager's name, email, employee ID and office number.", () => { 
        const manager = new Employee()
        manager.name = "Michael Scott";
        manager.email = "michael.scott@email.com";
        manager.employeeId = "1";
        manager.officeNumber = "A100"

        expect(manager.name).to.equal("Michael Scott");
    });
}
)