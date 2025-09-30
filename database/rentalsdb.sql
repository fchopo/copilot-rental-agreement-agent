/****** Object:  Table [dbo].[RentalAgreements]    Script Date: 30/09/2025 16:55:22 ******/
CREATE DATABASE [RentalsDb]  (EDITION = 'GeneralPurpose', SERVICE_OBJECTIVE = 'GP_S_Gen5_1', MAXSIZE = 32 GB) WITH CATALOG_COLLATION = SQL_Latin1_General_CP1_CI_AS, LEDGER = OFF;
GO

USE RentalsDb
GO

CREATE TABLE [dbo].[RentalAgreements](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Tenant] [nvarchar](100) NULL,
	[Landlord] [nvarchar](100) NULL,
	[StartDate] [date] NULL,
	[EndDate] [date] NULL,
	[MonthlyRent] [decimal](18, 2) NULL,
	[Deposit] [decimal](18, 2) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


