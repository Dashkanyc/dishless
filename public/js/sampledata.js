var samplenodes =  [ // node data
                                      {
                                          key: "VPC-12345",
                                          text: "VPC-12345",
                                          isGroup: true,
                                          category: "Pool", tooltip: "5 EIPs\n2 VPN Connections\n6 Routing Tables"
                                      },
                                      {
                                          key: "VPC-09334",
                                          text: "VPC-09334",
                                          isGroup: true,
                                          category: "Pool", tooltip: "5 EIPs\n2 VPN Connections\n6 Routing Tables"
                                      },
                                      {
                                          key: "Avail Zone 1",
                                          text: "Avail Zone 1",
                                          isGroup: true,
                                          group: "VPC-12345",
                                          color: "lightblue"
                                      },
                                      {
                                          key: "Avail Zone 2",
                                          text: "Avail Zone 2",
                                          isGroup: true,
                                          group: "VPC-12345",
                                          color: "lightgreen"
                                      },
                                      {
                                          key: "Avail Zone 3",
                                          text: "Avail Zone 3",
                                          isGroup: true,
                                          group: "VPC-12345",
                                          color: "lightyellow"
                                      },
                                      {
                                          key: "Avail Zone 4",
                                          text: "Avail Zone 4",
                                          isGroup: true,
                                          group: "VPC-12345",
                                          color: "orange"
                                      },
                                      {
                                          key: "Avail Zone 5",
                                          text: "Avail Zone 2",
                                          isGroup: true,
                                          group: "VPC-09334",
                                          color: "orange"
                                      },
                                      {
                                          key: "Avail Zone 6",
                                          text: "Avail Zone 1",
                                          isGroup: true,
                                          group: "VPC-09334",
                                          color: "yellow"
                                      },
                                      {
                                          key: "oneA",
                                          group: "Avail Zone 1",type: "subnet",number: 10, text: "Subnet 12345", bg: "red",error: true, info: "shredded curtains", tooltip: "Tip1\nTip2\nTip3\nTip4"
                                      },
                                      {
                                          key: "oneB",
                                          group: "Avail Zone 1",type: "subnet", number: 17, text: "Subnet 98777", bg: "white", tooltip: "Tip1\nTip2\nTip3\nTip4"
                                      },


                                      {
                                          key: "twoA",
                                          group: "Avail Zone 2",type: "subnet",number: 22, text: "Subnet 12345", bg: "red", tooltip: "Tip1\nTip2\nTip3\nTip4"
                                      },
                                      {
                                          key: "twoB",
                                          group: "Avail Zone 2",type: "subnet", number: 17, text: "Subnet 98777", bg: "white", tooltip: "Tip1\nTip2\nTip3\nTip4"
                                      },
                                      {
                                          key: "IG-234234", text: "Internet GW - 1", isGroup: false, type: "igw"
                                      }
                                      ,
                                      {
                                          key: "IG-987987", text: "Internet GW - 2 [Egress Only]", isGroup: false, type: "igw"
                                      }

                                  ];

                                 var samplelinks = [ // link data
                                                                 {from:"VPC-12345", to: "VPC-09334", text: "PeeringConn-2342" }, {from:"VPC-12345", to: "IG-234234" },  {from:"VPC-09334", to: "IG-987987" },{from: "oneA", to: "oneB", text: "RT-2343"}, {from: "twoA", to: "twoB", text: "RT-2343"},  {from: "oneA", to: "twoB", text: "RT-2343"}

                                                                   ];
