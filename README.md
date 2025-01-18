# PlanAhead Stash

PlanAhead Stash system will aggregate your various investments &amp; savings in one place.

This service will uses Spring Boot as the web framework as it's easy to build, fast, and I can practice.

## Tools to be used

**Programming Languages:**

- Java
- SQL
- TypeScript

**Frameworks:**

- Spring Boot
- Spring JPA
- Spring Security
- Spring Actuator for monitoring


**IDE & Code Editor:**

- Intellij Idea

**Database:**

- PostgreSQL
- MySQL


## Notes


Entities Ideas Reference from Gemini

**1. User**

*   **id:** Long (primary key, auto-generated)
*   **username:** String (unique)
*   **password:** String (hashed and salted)
*   **email:** String (unique)
*   **firstName:** String
*   **lastName:** String

**2. Asset**

*   **id:** Long (primary key, auto-generated)
*   **symbol:** String (e.g., "AAPL", "BTC", "MSFT")
*   **name:** String (e.g., "Apple Inc.", "Bitcoin", "Microsoft")
*   **assetType:** String (e.g., "stock", "crypto", "bond", "etf")

**3. Portfolio**

*   **id:** Long (primary key, auto-generated)
*   **name:** String (e.g., "Retirement", "Day Trading")
*   **userId:** Long (foreign key referencing User)

**4. PortfolioHolding**

*   **id:** Long (primary key, auto-generated)
*   **portfolioId:** Long (foreign key referencing Portfolio)
*   **assetId:** Long (foreign key referencing Asset)
*   **quantity:** BigDecimal
*   **purchasePrice:** BigDecimal
*   **purchaseDate:** LocalDate

**5. Transaction**

*   **id:** Long (primary key, auto-generated)
*   **portfolioHoldingId:** Long (foreign key referencing PortfolioHolding)
*   **transactionType:** String (e.g., "BUY", "SELL")
*   **quantity:** BigDecimal
*   **price:** BigDecimal
*   **date:** LocalDate

**6. MarketData**

*   **id:** Long (primary key, auto-generated)
*   **assetId:** Long (foreign key referencing Asset)
*   **date:** LocalDate
*   **openPrice:** BigDecimal
*   **highPrice:** BigDecimal
*   **lowPrice:** BigDecimal
*   **closePrice:** BigDecimal
*   **volume:** Long

**Relationships:**

*   One User can have many Portfolios.
*   One Portfolio can have many PortfolioHoldings.
*   One PortfolioHolding belongs to one Portfolio and one Asset.
*   One PortfolioHolding can have many Transactions.
*   One Asset can have many MarketData entries.

**Note:**

*   This is a basic structure. You can add more fields and relationships as needed (e.g., dividends, currencies, risk profiles).
*   Consider using JPA annotations (e.g., @Entity, @Id, @ManyToOne, @OneToMany) to define these entities in your Spring Boot application.
*   You can use these entities to create repositories (e.g., UserRepository, PortfolioRepository) for data access.

This structure provides a solid foundation for building your investment portfolio tracker application. You can then use these entities to implement the core features described earlier.
