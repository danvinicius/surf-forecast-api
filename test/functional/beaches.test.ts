describe('Beaches functional testes', () => {
  describe('When creating beach', () => {
    it('should create a beach with sucess', async () => {
      const newBeach = {
        lat: -33.792726,
        lng: 151.289824,
        name: 'Manly',
        position: 'E',
        user: 'some-id',
      };

      const response = await global.testRequest.post('/beaches').send(newBeach)
      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.objectContaining(newBeach));
    });
  });
});
