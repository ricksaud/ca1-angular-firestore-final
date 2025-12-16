import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.page.html',
  styleUrls: ['./ad-detail.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // required for <swiper-container>
})
export class AdDetailPage {
  property: any;

  // Array of all properties
  properties = [
    {
      id: '1',
      title: 'Luxury City Apartment',
      location: 'Dublin, Ireland',
      price: 750000,
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      description: `
        A rare opportunity to acquire a luxurious 3-bed penthouse located in the heart of Grand Canal Dock, 
    one of Dublin's most prestigious and sought-after neighbourhoods. This high-end residence boasts 
    panoramic city views, floor-to-ceiling windows, dual balconies, and premium finishes throughout.  
    The property forms part of an exclusive modern development with private residents’ gardens, 24/7 
    concierge services, and secure underground parking.

    The open-plan living and dining area is flooded with natural light, complemented by a premium fitted 
    kitchen with quartz countertops, integrated Miele appliances, and a breakfast island. The master suite 
    includes a walk-in wardrobe and a hotel-style en-suite bathroom finished in Italian marble.
      `,
      images: [
        '/assets/properties/luxury_dublin_1.jpg',
        '/assets/properties/luxury_dublin_2.jpg',
        '/assets/properties/luxury_dublin_3.jpg',
      ],
      features: [
        'Floor-to-ceiling windows with panoramic city and water views',
        'Two private balconies',
        'Miele integrated kitchen appliances',
        'Marble-finished bathrooms',
        'Master bedroom with walk-in wardrobe',
        '24-hour concierge desk',
        'Secure underground parking space',
        'Private residents’ landscaped courtyard',
        'Energy-efficient A2 BER rating',
        'Underfloor heating',
        'High-speed fibre broadband',
      ],
    },
    {
      id: '2',
      title: 'Cozy Cork House',
      location: 'Cork, Ireland',
      price: 325000,
      bedrooms: 3,
      bathrooms: 2,
      area: 95,
      description: `
        This charming family house is located in a peaceful neighborhood of Cork. The property boasts a welcoming living room with a fireplace, a modern kitchen with high-quality appliances, and a sunlit dining area perfect for family gatherings. Upstairs, there are three comfortable bedrooms and two bathrooms, including a master ensuite. Outside, a private garden and patio area provide a perfect space for outdoor relaxation or entertaining guests. The property is conveniently close to schools, shops, and local amenities, making it ideal for families or professionals.
      `,
      images: [
        '/assets/properties/cozy_cork_1.jpg',
        '/assets/properties/cozy_cork_2.jpg',
        '/assets/properties/cozy_cork_3.jpg',
      ],
      features: [
        'Private Garden',
        'Patio for Outdoor Dining',
        'Fireplace in Living Room',
        'Modern Kitchen with Appliances',
        'Master Bedroom Ensuite',
        'Double Glazed Windows',
        'Close to Schools and Shops',
        'Quiet Residential Street',
      ],
    },
    {
      id: '3',
      title: 'Modern Limerick House',
      location: 'Limerick, Ireland',
      price: 600000,
      bedrooms: 3,
      bathrooms: 2,
      area: 145,
      description: `
        This modern house in Limerick offers a perfect combination of comfort and style.
The property features a spacious open-plan living area with large windows that flood the
space with natural light. The kitchen is fully fitted with contemporary appliances and 
a breakfast bar. The master bedroom includes an en-suite bathroom, and there is a
well-maintained garden ideal for outdoor activities. Situated in a quiet residential
area, this house is perfect for families seeking a peaceful environment close to the
city center.
      `,
      images: [
        '/assets/properties/modern_limerick_1.jpg',
        '/assets/properties/modern_limerick_2.jpg',
        '/assets/properties/modern_limerick_3.jpg',
      ],
      features: [
        'Fully fitted kitchen with modern appliances',
        'En-suite master bedroom',
        'Energy-efficient heating system',
        'Garden with patio',
        'Close to schools and public transport',
        'Spacious living and dining area',
        'Off-street parking',
      ],
    },

    {
      id: '4',
      title: 'Charming Galway Cottage',
      location: 'Galway, Ireland',
      price: 320000,
      bedrooms: 2,
      bathrooms: 1,
      area: 85,
      description: `
    This charming cottage in Galway combines traditional Irish character with modern comforts. 
    The cottage features a cozy living room with a wood-burning fireplace, a fully fitted kitchen 
    with modern appliances, and a dining area with views over the garden. The two bedrooms are 
    bright and welcoming, with a shared family bathroom. Outside, a private garden and patio provide 
    a perfect space for relaxation. Located close to the city center and local amenities, this property 
    is ideal for first-time buyers or those seeking a quaint, low-maintenance home in a picturesque location.
  `,
      images: [
        '/assets/properties/galway_cottage_1.jpg',
        '/assets/properties/galway_cottage_2.jpg',
        '/assets/properties/galway_cottage_3.jpg',
      ],
      features: [
        'Traditional Irish cottage charm',
        'Cozy living room with fireplace',
        'Fully fitted modern kitchen',
        'Dining area with garden view',
        'Two bright bedrooms',
        'Private garden and patio',
        'Close to Galway city center',
        'Quiet neighborhood',
        'Low-maintenance property',
      ],
    },

    {
      id: '5',
      title: 'Spacious Belfast Townhouse',
      location: 'Belfast, Northern Ireland',
      price: 480000,
      bedrooms: 4,
      bathrooms: 3,
      area: 180,
      description: `
    This spacious townhouse in Belfast offers contemporary living with traditional elegance. 
    The property boasts a large living room with bay windows, a modern kitchen with integrated 
    appliances, and a dining area suitable for family gatherings. Upstairs, four bedrooms include 
    a master suite with an en-suite bathroom. Outside, a private courtyard and garage complete 
    this excellent family home. Conveniently located close to schools, shops, and public transport, 
    this property is ideal for families seeking comfort and practicality in the city.
  `,
      images: [
        '/assets/properties/belfast_townhouse_1.jpg',
        '/assets/properties/belfast_townhouse_2.jpg',
        '/assets/properties/belfast_townhouse_3.jpg',
      ],
      features: [
        'Large living room with bay windows',
        'Modern kitchen with integrated appliances',
        'Dining area for family gatherings',
        'Master bedroom with en-suite',
        'Four spacious bedrooms',
        'Private courtyard',
        'Garage for two cars',
        'Close to schools and shops',
        'Convenient public transport access',
      ],
    },

    {
      id: '6',
      title: 'Seaside Waterford Home',
      location: 'Waterford, Ireland',
      price: 400000,
      bedrooms: 3,
      bathrooms: 2,
      area: 130,
      description: `
    Stunning seaside home in Waterford with panoramic sea views. This property features a bright 
    open-plan living area with floor-to-ceiling windows, a modern kitchen with breakfast bar, 
    and a cozy lounge ideal for relaxing with the family. Three spacious bedrooms include a 
    master with en-suite, and there is a family bathroom. Outside, a terrace and garden provide 
    perfect outdoor entertaining space, with direct access to nearby coastal walks. This home is 
    perfect for those seeking a tranquil lifestyle near the sea.
  `,
      images: [
        '/assets/properties/waterford_home_1.jpg',
        '/assets/properties/waterford_home_2.jpg',
        '/assets/properties/waterford_home_3.jpg',
      ],
      features: [
        'Panoramic sea views',
        'Open-plan living and dining area',
        'Modern kitchen with breakfast bar',
        'Master bedroom with en-suite',
        'Two additional spacious bedrooms',
        'Family bathroom',
        'Terrace and garden for entertaining',
        'Direct access to coastal walks',
        'Quiet and peaceful neighborhood',
        'High-speed internet and utilities ready',
      ],
    },

    {
      id: '7',
      title: 'Elegant Kilkenny Mansion',
      location: 'Kilkenny, Ireland',
      price: 750000,
      bedrooms: 5,
      bathrooms: 4,
      area: 420,
      description: `
    A magnificent mansion in Kilkenny combining elegance and modern comfort. The property boasts 
    a grand entrance hall, expansive living and dining areas, a gourmet kitchen with high-end 
    appliances, and a library/study. Five spacious bedrooms include a master suite with walk-in 
    wardrobe and luxurious en-suite bathroom. Outdoors, beautifully landscaped gardens, a private 
    driveway, and a patio provide a serene environment for entertainment or relaxation. This 
    prestigious residence is ideal for families seeking a luxury lifestyle in the heart of Kilkenny.
  `,
      images: [
        '/assets/properties/kilkenny_mansion_1.jpg',
        '/assets/properties/kilkenny_mansion_2.jpg',
        '/assets/properties/kilkenny_mansion_3.jpg',
      ],
      features: [
        'Grand entrance hall',
        'Spacious living and dining areas',
        'Gourmet kitchen with premium appliances',
        'Library / study room',
        'Master bedroom with walk-in wardrobe and luxurious en-suite',
        'Four additional bedrooms',
        'Three further bathrooms',
        'Landscaped gardens and patio',
        'Private driveway and garage',
        'High-speed internet and smart home features',
      ],
    },
  ];

  constructor(private route: ActivatedRoute) {
    const propertyId = this.route.snapshot.paramMap.get('id');
    this.property = this.properties.find((p) => p.id === propertyId);
  }
}
