import CheckBox from "../../../components/checkBox";
import { Input } from "../../../components/input";
import { Select } from "../../../components/select";

import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { useUserAdd } from "../hooks/use-user-add.hook";
import { centresInteret } from "../services/centres-interet";

export function UserAdd() {
  const { register, handleSubmit, isSubmitting, errors, handleAdd } =
    useUserAdd();

  return (
    <div className="mx-auto mt-4 bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b bg-muted/40">
        <p className="text-lg font-semibold">Ajouter un utilisateur</p>
        <p className="text-muted-foreground text-xs">
          Mise à jour des informations utilisateur
        </p>
      </div>

      <form
        onSubmit={handleSubmit(handleAdd)}
        className="flex flex-col gap-4 px-6 py-4"
      >
        {/* Nom */}
        <div className="flex flex-col gap-2">
          <Label>Nom</Label>
          <Input
            type="text"
            register={register}
            name="nom"
            rules={{ required: "Le nom est obligatoire" }}
            placeholder="Entrer le nom"
          />
          {errors.nom && (
            <span className="text-red-500 font-semibold text-xs">
              {errors.nom?.message}
            </span>
          )}
        </div>

        {/* Prénom */}
        <div className="flex flex-col gap-2">
          <Label>Prénom</Label>
          <Input
            type="text"
            register={register}
            name="prenom"
            rules={{ required: "Le prénom est obligatoire" }}
            placeholder="Entrer le prénom"
          />
          {errors.prenom && (
            <span className="text-red-500 font-semibold text-xs">
              {errors.prenom?.message}
            </span>
          )}
        </div>

        {/* Genre */}
        <div className="flex flex-col gap-2">
          <Label>Genre</Label>
          <Select
            name="genre"
            optionText="Sélectionnez le genre"
            register={register}
            options={["Homme", "Femme"]}
            rules={{ required: "Genre obligatoire" }}
          />
          {errors.genre && (
            <span className="text-red-500 font-semibold text-xs">
              {errors.genre?.message}
            </span>
          )}
        </div>

        {/* Tel */}

        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <Label>Tel</Label>
            {errors.tel && (
              <span className="text-xs flex-1  text-destructive font-semibold relative h-full w-20  ">
                <span className="absolute -top-2">{errors.tel.message}</span>
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

        {/* Centres d'intérêt */}
        <div className="flex flex-col gap-2">
          <Label>Centres d'intérêt</Label>
          <div className="grid md:grid-cols-3 gap-3 ">
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

        {/* Bouton */}
        <Button
          type="submit"
          desactived={isSubmitting}
          textValider="En cour..."
        >
          Ajouter
        </Button>
      </form>
    </div>
  );
}
