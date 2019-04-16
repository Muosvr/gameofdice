const nameStr = "Adie, Angie, Ashton, Aubrey, Barnes, Barry, Basil, Bernadine, Bethany, Bette, Betty, Blanche, Braden, Bradley, Brent, Bret, Brett, Burdine, Caden, Cadence, Carrington, Charlene, Charles, Charlton, Chay, Chet, Christopher, Clinton, Corina, Cowden, Darby, Daris, Darleen, Darlene, Darnell, Deb, Demi, Dennis, Diamond, Doreen, Dorian, Dorothy, Dustin, Earlene, Elaine, Elfriede, Eli, Emery, Emory, Evan, Gabriel, Georgiana, Gladys, Greenbury, Gregory, Greig, Gwen, Hannah, Harley, Harriet, Hastings, Hazel, Heather, Helton, Henrietta, Heston, Holly, Hulda, Increase, India, Irene, Jackie, Jade, Jean, Jemma, Jenny, Jerald, Jerrold, Jerry, Jessie, Jethro, Jigar, Jill, Jocelyn, Jodie, Joey, Julia, Justine, Kate, Kathryn, Keaton, Kendra, Kerr, Kimball, Kitty, Kristy, Kylie, Laren, Lawrence, Lawson, Leanne, Lianne, Louise, Luci, Lucius, Lucretia, Maddox, Madeleine, Malford, Marlene, Maud, Melinda, Melville, Miley, Millicent, Mindi, Mindy, Moira, Molly, Mort, Nancy, Naomi, Nelson, Nevaeh, Nigel, Osbert, Ottilie, Pamela, Pascoe, Patricia, Percy, Philip, Philippa, Pippa, Poppy, Quintus, Rebecca, Reynold, Rhoda, Riley, Roland, Rosaleen, Rosalie, Rosie, Ruby, Rupert, Ruth, Savannah, Scarlett, Schuyler, Scott, Sharon, Sheridan, Shiloh, Sibyl, Sidney, Stacy, Sydney, Tabitha, Tammy, Theodore, Timothy, Tracy, Travis, Trent, Velma, Vicary, Violet, Virgil, Virginia, Warren, Whitney, Whittaker, Wilfried, Woodrow"

const Names = nameStr.split(", ");

function GenRandomName() {
  const index = Math.floor(Math.random() * Names.length)
  return Names[index]
}

console.log(GenRandomName());
export default GenRandomName;