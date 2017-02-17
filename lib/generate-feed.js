'use strict'

const RSS = require('rss')

module.exports = (json) => {
  let feed = new RSS({
    title: 'Telemark fylkeskommune - ledige stillinger',
    description: 'Ledige stillinger fra Telemark fylkeskommune',
    feed_url: 'https://recruitments.t-fk.win/rss',
    site_url: 'https://www.telemark.no',
    language: 'no',
    pubDate: new Date(),
    ttl: '60',
    custom_namespaces: {
      'wc': 'http://webcruiter.no/xml'
    },
    custom_elements: [
      {'wc:culture_id': 'NB-NO'}
    ]
  })

  json.forEach(item => {
    feed.item({
      title: item.title,
      description: item.title,
      url: item.link,
      date: item.published, // any format that js Date can parse.
      custom_elements: [
        {'wc:AdvertId': ''},
        {'wc:CompanyId': ''},
        {'wc:apply_within_date': item.deadline},
        {'wc:company_name': item.companyName},
        {'wc:WorkplaceCounties': 'Telemark'},
        {'wc:WorkplaceStreetAddress': ''},
        {'wc:WorkplacePostno': ''},
        {'wc:WorkplacePostaddress': ''},
        {'wc:ApplicableCondition': ''},
        {'wc:Qualification': ''},
        {'wc:Personality': ''},
        {'wc:RefNr': ''},
        {'wc:WorkhourPercentage': ''},
        {'wc:EducationTitle': ''},
        {'wc:AdvertTextFree': ''},
        {'wc:ExternalPositionCode': ''},
        {'wc:NumberOfPositions': ''},
        {'wc:Culture_Id': ''},
        {'wc:CountryId': 1},
        {'wc:CountryName': 'Norge'},
        {'wc:StartDate': ''},
        {'wc:EndDate': ''},
        {'wc:WePubDateFrom': ''},
        {'wc:WePubDateTo': ''},
        {'wc:IntranetPubDateFrom': ''},
        {'wc:IntranetPubDateTo': ''},
        {'wc:WORKPLACE_COUNTIES_COLLECTION': [
          {'wc:Iitem': 'Telemark'}
        ]},
        {'wc:JOB_TYPE_COLLECTION': [
          {'wc:Iitem': item.positionType}
        ]},
        {'wc:JSPECIAL_FIELD_COLLECTION': []},
        {'wc:INDUSTRY_COLLECTION': []},
        {'wc:EDUCATION_BRANCH_COLLECTION': []},
        {'wc:EDUCATION_LEVEL_COLLECTION': []},
        {'wc:APPLICABLE_LANGUAGE_COLLECTION': []},
        {'wc:CONTACTINFO': [
          {Contact: {
            Name: '',
            Title: '',
            Phone: '',
            Email: ''
          }}
        ]}
      ]
    })
  })

  return feed.xml()
}
