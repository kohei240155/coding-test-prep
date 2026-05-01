CREATE PROCEDURE GetUserOrderTotal
  @UserId INT
AS
BEGIN
  SELECT SUM(amount) AS Total
  FROM orders
  WHERE user_id = @UserId;
END;

EXEC GetUserOrderTotal @UserId = 123;