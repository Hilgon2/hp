export interface HpHouse {
  attributes: {
    street: string;
    houseNumber: number;
    houseNumberExt: string;
    houseNumberFull: string;
    postcode: string;
    city: string;
    municipality: string;
    province: string;
    latitude: number;
    longitude: number;
    cbsNeighbourhoodId: number;
    cbsDistrictId: number;
    useSurface: number;
    volume: number;
    buildYear: number;
    houseType: string;
    houseSubType: string;
    energyLabel: string;
    huispediaProfileUrl: string;
    plotSize: number | null;
    image: {
      href: string;
    };
    kadasterData: {
      bagBuildingId: string;
      bagNumberDesignationId: string;
      bagObjectId: string;
    };
    offer: {
      lastModifiedAt: string;
      rentalPrice: number;
      salePrice: number;
      status: HpHouseStatus;
    };
  };
  id: number;
  links: {
    related: string;
    self: string;
  };
  type: HpHouseType;
}

export type HpHouseType = 'property' | 'business';
export type HpHouseStatus = 'TE KOOP EN TE HUUR' | 'TE KOOP' | 'TE HUUR';
