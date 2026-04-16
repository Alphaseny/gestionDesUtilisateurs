import { AnimatePresence, motion } from "framer-motion";
import { MoreHorizontalIcon, Trash2Icon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { CreateUserContext } from "../../../contexts/userContext";
import type { User } from "../../../types/types";

import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";

import CheckBox from "../../../components/checkBox";
import { Input } from "../../../components/input";
import { Select } from "../../../components/select";
import { Label } from "../../../components/ui/label";

import { useUserDelete } from "../hooks/use-user-delete.hook";
import { useUserEdit } from "../hooks/use-user-edit.hook";
import { centresInteret } from "../services/centres-interet";

export function UserList() {
  const { users } = useContext(CreateUserContext)!;

  const { handleDelete } = useUserDelete();

  const { handleEdit, register, handleSubmit, reset, isSubmitting, errors } =
    useUserEdit();

  const [selectedUserDelete, setSelectedUserDelete] = useState<User | null>(
    null,
  );
  const [selectedUserEdit, setSelectedUserEdit] = useState<User | null>(null);

  // Sync form
  useEffect(() => {
    if (selectedUserEdit) {
      reset(selectedUserEdit);
    }
  }, [selectedUserEdit, reset]);

  return (
    <div>
      <p className="font-semibold text-lg pb-3">Liste des utilisateurs</p>

      {/* TABLE */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Nom</TableHead>
            <TableHead className="font-semibold">Prénom</TableHead>
            <TableHead className="font-semibold">Genre</TableHead>
            <TableHead className="font-semibold">Tel</TableHead>
            <TableHead className="font-semibold pl-4">
              Centres d'intérêt
            </TableHead>
            <TableHead className="text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <AnimatePresence>
            {users.length > 0 ? (
              users.map((user) => (
                <motion.tr
                  key={user.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="border-b"
                >
                  <TableCell className="text-xs">{user.nom}</TableCell>
                  <TableCell className="text-xs">{user.prenom}</TableCell>
                  <TableCell className="text-xs">{user.genre}</TableCell>
                  <TableCell className="text-xs">{user.tel}</TableCell>

                  <TableCell>
                    {user.centreInteret?.length ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild className="w-full">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex justify-start"
                          >
                            Voir les centres d'interêt
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-56 flex flex-wrap gap-2">
                          {user.centreInteret.map((item, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-xs bg-muted rounded"
                            >
                              {item}
                            </span>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <span className="text-muted-foreground text-xs ml-3">
                        Aucun les centres d'interêt
                      </span>
                    )}
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontalIcon className="text-xs" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => setSelectedUserEdit(user)}
                        >
                          Modifier
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="text-destructive hover:!text-destructive bg-red-50 hover:!bg-red-100"
                          onClick={() => setSelectedUserDelete(user)}
                        >
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </motion.tr>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Aucun utilisateur trouvé !
                </TableCell>
              </TableRow>
            )}
          </AnimatePresence>
        </TableBody>
      </Table>

      {/* DELETE */}
      <AlertDialog
        open={!!selectedUserDelete}
        onOpenChange={() => setSelectedUserDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
              <Trash2Icon />
            </AlertDialogMedia>
            <AlertDialogTitle>
              Voulez-vous supprimer cet utilisateur ?
            </AlertDialogTitle>
            <AlertDialogDescription>Action irréversible</AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>

            <Button
              variant="destructive"
              onClick={() => {
                if (selectedUserDelete) {
                  handleDelete(selectedUserDelete.id!);
                  setSelectedUserDelete(null);
                }
              }}
            >
              Supprimer
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* EDIT */}
      <AlertDialog
        open={!!selectedUserEdit}
        onOpenChange={() => setSelectedUserEdit(null)}
      >
        <AlertDialogContent className="!max-w-5xl w-full p-0 overflow-hidden rounded-2xl shadow-2xl">
          {/* HEADER */}
          <div className="px-6 py-4 border-b bg-muted/40">
            <AlertDialogTitle className="text-lg font-semibold">
              Modifier utilisateur
            </AlertDialogTitle>
            <AlertDialogDescription>
              Mise à jour des informations utilisateur
            </AlertDialogDescription>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit((data) => {
              if (selectedUserEdit) {
                handleEdit(selectedUserEdit.id!, data);
                setSelectedUserEdit(null);
              }
            })}
            className="p-6 flex flex-col gap-6 max-h-[75vh] overflow-y-auto"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <Label>Nom</Label>
                  {errors.nom && (
                    <span className="text-lg  text-destructive font-bold relative h-full w-20  ">
                      <span className="absolute -top-0.5">
                        {errors.nom.message}
                      </span>
                    </span>
                  )}
                </div>
                <Input
                  name="nom"
                  register={register}
                  placeholder="Entrer le nom"
                  rules={{ required: "*" }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <Label>Prénom</Label>
                  {errors.prenom && (
                    <span className="text-lg  text-destructive font-bold relative h-full w-20  ">
                      <span className="absolute -top-0.5">
                        {errors.prenom.message}
                      </span>
                    </span>
                  )}
                </div>
                <Input
                  name="prenom"
                  register={register}
                  placeholder="Entrer le prénom"
                  rules={{ required: "*" }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <Label>Genre</Label>
                  {errors.genre && (
                    <span className="text-lg  text-destructive font-bold relative h-full w-20  ">
                      <span className="absolute -top-0.5">
                        {errors.genre.message}
                      </span>
                    </span>
                  )}
                </div>
                <Select
                  name="genre"
                  register={register}
                  options={["Homme", "Femme"]}
                  optionText="Choisir"
                  rules={{ required: "Genre obligatoire" }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <Label>Tel</Label>
                  {errors.tel && (
                    <span className="text-xs flex-1  text-destructive font-semibold relative h-full w-20  ">
                      <span className="absolute -top-01">
                        {errors.tel.message}
                      </span>
                    </span>
                  )}
                </div>

                <Input
                  name="tel"
                  register={register}
                  placeholder="Entrer le tel"
                  rules={{
                    pattern: {
                      value: /^\+?\d[\d\s]{8,14}$/,
                      message: "Numéro invalide",
                    },
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Centres d'intérêt</Label>
              <div className="grid md:grid-cols-3 gap-3 mt-2">
                {centresInteret.map((i) => (
                  <label key={i.id} className="flex gap-2 border p-2 rounded">
                    <CheckBox
                      name="centreInteret"
                      value={i.name}
                      register={register}
                    />
                    {i.name}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t pt-4">
              <AlertDialogCancel type="button">Annuler</AlertDialogCancel>

              {/*  SUBMIT */}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Modification..." : "Valider la modifier"}
              </Button>
            </div>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
